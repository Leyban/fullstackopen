import { useApolloClient } from '@apollo/client';
import { useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommended from './components/Recommended';
import { BOOK_ADDED, GET_BOOKS, GET_BOOKS_BY_GENRE, updateCache } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  // logging in the user who did not log out
  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded;
      const queries = client.cache.data.data.ROOT_QUERY;
      alert(`${addedBook.title} added`);

      // updates all books for genre buttons
      updateCache(client.cache, { query: GET_BOOKS }, addedBook);

      // function for updating query by genre
      const updateBooksByGenre = (genreToUpdate) => {
        client.cache.updateQuery({ query: GET_BOOKS_BY_GENRE, variables: { genre: genreToUpdate } }, (data) => {
          const duplicate = data.allBooks.filter((book) => book.title === addedBook.title);
          if (!duplicate.length) {
            return { allBooks: data.allBooks.concat(addedBook) };
          }
          return data;
        });
      };

      // update "all genre" query
      updateBooksByGenre(undefined);

      // updates genre specific books in cache
      addedBook.genres.forEach((genre) => {
        if (queries[`allBooks({"genre":"${genre}"})`]) {
          updateBooksByGenre(genre);
        }
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('books');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommend'} token={token} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
