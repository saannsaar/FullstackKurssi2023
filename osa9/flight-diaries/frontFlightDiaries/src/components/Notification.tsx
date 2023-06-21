// TODO

import React, { Dispatch, SetStateAction, useState } from "react";
import diaryService from '../services/diaryService';
import { Diary, NewDiary, Visibility, Weather } from "../types";

interface NotiProps {
    diaries: Diary[]; 
}

const Notification = (props: NotiProps) => {


  

    return (
       <div>
        <h2> Diary Entries</h2>
        {
            props.diaries.map((d) => (
                <h3 key={d.id}>{d.date}</h3>
            ))
        }
       </div>
    )
}

export default Notification