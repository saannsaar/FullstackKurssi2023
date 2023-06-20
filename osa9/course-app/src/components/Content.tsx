import { CoursePart } from '../types';
import Part from './Part';


   
   const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
    return (<div>
        {courseParts.slice().map((p) => 
            (<Part key={p.name} part={p} />)
        )}
    </div>)
   };
 
   export default Content;