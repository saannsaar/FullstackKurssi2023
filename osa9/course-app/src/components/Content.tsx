

interface ContentProps {
    name: string;
    exerciseCount: number;
   }
   
   const Content = ({ courseParts }: { courseParts: ContentProps[] }): JSX.Element => {
    return (<div>
        {courseParts.slice().map((p) => 
            (<p key={p.name}>
                {p.name} {p.exerciseCount}
            </p>)
        )}
    </div>)
   };
 
   export default Content;