import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_AUTHORS, UPDATE_BORN } from '../queries';

const EditAuthorBirth = (props) => {
  const [name, setName] = useState('');
  const [birthyear, setBirthYear] = useState('');

  const [updateBirthYear] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: GET_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBirthYear({ variables: { name, setBornTo: Number(birthyear) } });
  };

  return (
    <div>
      <h1>Set Birthyear</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <select name="authorName" id="authorName" value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born: <input type="text" value={birthyear} onChange={({ target }) => setBirthYear(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthorBirth;
