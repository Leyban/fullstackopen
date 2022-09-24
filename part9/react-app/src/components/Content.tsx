import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <i>{part.description}</i>
        </p>
      );
    case 'groupProject':
      return <p>project exercises {part.groupProjectCount}</p>;
    case 'submission':
      return (
        <>
          <p>
            <i>{part.description}</i>
          </p>
          <p>exercise submition link {part.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p>
            <i>{part.description}</i>
          </p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      );
  }
};
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <Part key={part.name} part={part} />
        </>
      ))}
    </>
  );
};

export default Content;
