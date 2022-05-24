const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const { UserInputError, AuthenticationError } = require('apollo-server');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// subscription
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Author: {
    bookCount: async ({ id }) => {
      const booksByAuthor = await Book.find({ author: id });
      return booksByAuthor.length;
    },
  },
  Query: {
    bookCount: async (root, args) => Book.collection.countDocuments(),
    authorCount: async (root, args) => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author');
      } else if (!args.genre) {
        const authorFilter = await Author.findOne({ name: args.author });
        if (authorFilter) {
          return Book.find({ author: authorFilter._id }).populate('author');
        }
        return [];
      } else if (!args.author) {
        return Book.find({ genres: args.genre }).populate('author');
      }
      const authorFilter = await Author.findOne({ name: args.author });
      if (authorFilter) {
        return Book.find({ genres: args.genre, author: authorFilter._id }).populate('author');
      }
      return [];
    },
    allAuthors: async (root, args) => Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authorized');
      }

      let newBookAuthor = await Author.findOne({ name: args.author });
      let savedAuthor;
      if (!newBookAuthor) {
        newBookAuthor = new Author({
          name: args.author,
        });
        try {
          savedAuthor = await newBookAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      } else {
        savedAuthor = newBookAuthor;
      }

      const newBook = new Book({
        title: args.title,
        author: savedAuthor._id,
        published: args.published,
        genres: args.genres,
      });

      let savedBook;

      try {
        savedBook = await newBook.save();
        await savedBook.populate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });
      return savedBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authorized');
      }

      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) {
        return null;
      }
      authorToEdit.born = args.setBornTo;

      try {
        authorToEdit.save();
        return authorToEdit;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      try {
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const userLogged = await User.findOne({ username: args.username });

      if (!userLogged || args.password !== 'watdahek') {
        throw new UserInputError('Invalid username or password', {
          invalidArgs: args,
        });
      }

      const userForToken = {
        username: userLogged.username,
        id: userLogged._id,
      };

      return { value: jwt.sign(userForToken, SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;
