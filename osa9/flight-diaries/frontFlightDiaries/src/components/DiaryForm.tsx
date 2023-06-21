import React, { Dispatch, SetStateAction, useState } from "react";
import diaryService from '../services/diaryService';
import { Diary, NewDiary, Visibility, Weather } from "../types";

interface FormProps {
    setDiaries: Dispatch<SetStateAction<Diary[]>>; 
}

const DiaryForm = (props: FormProps) => {

    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather>(Weather.Stormy);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Poor);
    const [comment, setComment] = useState('');

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
                console.log(error.message, error)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Date <input value={date} onChange={e => setDate(e.target.value)} type="date"/>
                </div>
                <div>
                    Weather <input value={weather} onChange={e => setWeather(e.target.value)} type="text"/>
                </div>
                <div>
                    Visibility <input value={visibility} onChange={e => setVisibility(e.target.value)} type="text"/>
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