import { CoursePart } from "../types";
  
  const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
   return (<h4>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </h4>)
  };

  export default Total;