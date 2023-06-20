

interface TotalProps {
   name: string;
   exerciseCount: number;
  }
  
  const Total = ({ courseParts }: { courseParts: TotalProps[] }): JSX.Element => {
   return (<h4>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </h4>)
  };

  export default Total;