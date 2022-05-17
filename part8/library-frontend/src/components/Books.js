import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_BOOKS, GET_BOOKS_BY_GENRE } from '../queries';

const Books = (props) => {
  let booksToRender = [];
  const [genreFilter, setGenreFilter] = useState(undefined);

  const result = useQuery(GET_BOOKS);
  const filteredBooks = useQuery(GET_BOOKS_BY_GENRE, { variables: { genre: genreFilter } });
  let books = [];
  let genres = [];

  if (!result.loading) {
    books = result.data.allBooks;
    books.forEach((book) => {
      book.genres.forEach((g) => {
        if (!genres.includes(g)) {
          genres.push(g);
        }
      });
    });
  }

  if (!filteredBooks.loading) {
    booksToRender = filteredBooks.data.allBooks;
  }

  const handleGenre = (genre) => {
    if (genre === 'all') {
      return setGenreFilter(undefined);
    }
    setGenreFilter(genre);
  };

  if (!props.show || result.loading) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToRender.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => handleGenre('all')}>all genres</button>
    </div>
  );
};

export default Books;
