import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../queries';
import EditAuthorBirth from './EditAuthorBirth';

const Authors = (props) => {
  const result = useQuery(GET_AUTHORS);
  let authors;

  if (!result.loading) {
    authors = result.data.allAuthors;
  }

  if (!props.show || result.loading) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthorBirth authors={authors} />
    </div>
  );
};

export default Authors;
