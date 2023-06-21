
import React, { Dispatch, SetStateAction, useState } from "react";
import diaryService from '../services/diaryService';
import { Diary, NewDiary, Visibility, Weather } from "../types";
import axios from "axios";

interface FormProps {
    setDiaries: Dispatch<SetStateAction<Diary[]>>; 
}

const DiaryForm = (props: FormProps) => {

    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather>(Weather.Stormy);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Poor);
    const [comment, setComment] = useState('');
    const [notification, setNotification]  = useState('')

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const newDiary: NewDiary = {
            date,
            weather,
            visibility,
            comment
        }

        try {
            console.log(newDiary)
            const response = await diaryService.createDiary(newDiary);
            props.setDiaries(diariesBefore => [...diariesBefore, response as Diary])
            console.log(response)
            setDate('')
            setWeather(Weather.Stormy)
            setVisibility(Visibility.Poor)
            setComment('')
        }
        catch(error) {
            if (error instanceof Error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.status)
                    console.error(error.response);
                    setNotification(error.message)
                    setTimeout(() => {
                        setNotification('')
                    }, 4000)
                  } else {
                    setNotification(error.message)
                setTimeout(() => {
                    setNotification('')
                }, 4000)
                  }
                
            }
        }
    }

    return (
        <div>
            <h2>Add a new diary entry </h2>
            {notification && <div style={{color:'red'}}>{notification}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    Date <input value={date} onChange={e => setDate(e.target.value)} type="date"/>
                </div>
                <div>
                  Weather: 
                        { Object.values(Weather).map((w) => (
                            <label key={w}>
                                {w}
                                <input type='radio'value={w} checked={w === weather} onChange={e => setWeather(e.target.value as Weather)}/>
                            </label>
                            
                        ))}
                </div>
                <div> Visibility:
                { Object.values(Visibility).map((v) => (
                            <label key={v}>
                                {v}
                                <input type='radio' value={v} checked={v === visibility} onChange={e => setVisibility(e.target.value as Visibility)}/>
                            </label>
                            
                        ))}
                </div>
                <div>
                    Comment <input value={comment} onChange={e => setComment(e.target.value)} type="text"/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default DiaryForm