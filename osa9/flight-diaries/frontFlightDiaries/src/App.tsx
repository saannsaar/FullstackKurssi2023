import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Diary } from './types';
import diaryService from '../src/services/diaryService'
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);




  useEffect(() => {
   diaryService.getAllDiaries().then(data => {
    setDiaries(data)
   })
  }, [])


  return (
    <div>
      Diary Entries
      <ul>
        {diaries.map((d) => (
          <li key={d.id}>{d.date} {d.weather}, {d.visibility}</li>
        ))}
      </ul>
      <DiaryForm setDiaries={setDiaries} />
    </div>
  )
}



export default App;
