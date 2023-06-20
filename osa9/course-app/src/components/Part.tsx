import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
    const renderThis = ( part: CoursePart ) => {
        switch (part.kind) {
            case 'basic':
                console.log(part.name);
                return <p style={{ fontStyle:'italic' }}>{part.description}</p>
              
            case 'group':
                console.log(part.name);
                return <p >Project exercises: {part.groupProjectCount}</p>
                
            case 'background':
                return <p style={{ fontStyle:'italic' }}>Submit to: {part.backgroundMaterial}</p>;

            case 'special':
                return (<div> Requirements:   {part.requirements.map((r) => ( <p  style={{ fontSize: '12px', fontStyle:'italic' }}key={r}>{r}</p>))}</div>)
            default:
                break;
        }
    }

    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>
                {part.name} {part.exerciseCount}
                
            </p>
            {renderThis(part)}
            
        </div>
    )
}

export default Part;