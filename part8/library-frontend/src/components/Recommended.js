import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_BOOKS_BY_GENRE, LOGGED_USER } from '../queries';

const Recommended = ({ show, token }) => {
  let booksToRender = [];
  const [faveGenre, setFaveGenre] = useState('');
  const [showRecommend, setShowRecommend] = useState(false);
  const user = useQuery(LOGGED_USER);
  const filteredBooks = useQuery(GET_BOOKS_BY_GENRE, { variables: { genre: faveGenre } });

  useEffect(() => {
    console.log(user.data, token);
    if (!user.data || !token) {
      return setShowRecommend(false);
    } else if (user.data.me === null && token) {
      return user.refetch();
    }
    setFaveGenre(user.data.me.favouriteGenre);
    setShowRecommend(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.data, token]);

  if (!filteredBooks.loading) {
    booksToRender = filteredBooks.data.allBooks;
  }

  if (user.loading || filteredBooks.loading || !show || !showRecommend) {
    return null;
  }

  return (
    <div className="recommended">
      <h1>recommendations</h1>
      <p>
        books in your favourite genre: <strong>{faveGenre}</strong>
      </p>
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
    </div>
  );
};

export default Recommended;
