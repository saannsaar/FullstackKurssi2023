import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState('');



  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data);
      setDiaries(response.data)
    })
  }, [])

  return (
    <div>
      Moi
      <ul>
        {diaries.map((d) => (
          <li key={d.id}>{d.date} {d.weather}</li>
        ))}
      </ul>
    </div>
  )
}



export default App;
