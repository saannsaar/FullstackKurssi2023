/* eslint-disable react/jsx-key */
import { Diary } from "../types";

interface ListProps {
    diaries: Diary[]; 
}

const DiaryList = (props: ListProps) => {


  

    return (
       <div>
        <h2> Diary Entries</h2>
        {
            props.diaries.map((d) => (
                <div> 
                     <h3 key={d.id}>{d.date}</h3>
                    <div>Visibility: {d.visibility}</div>
                    <div>Weather: {d.weather}</div>
                </div>
               
                
            ))
        }
       </div>
    )
}

export default DiaryList