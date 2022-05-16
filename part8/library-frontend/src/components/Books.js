import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(GET_BOOKS);
  let books;

  if (!result.loading) {
    books = result.data.allBooks;
  }

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
