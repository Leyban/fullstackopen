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
      author {
        name
      }
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author {
        name
      }
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

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
