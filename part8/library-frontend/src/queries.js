import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      author
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      author
    }
  }
`;

export const UPDATE_BORN = gql`
  mutation AddBook($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      born
    }
  }
`;
