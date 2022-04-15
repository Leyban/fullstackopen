import Part from "./Part";
import Sum from "./Sum";

const Content = ({parts}) => {
    return (  
        <div className="content">
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <Sum parts={parts} />
        </div>
    );
}
 
export default Content;