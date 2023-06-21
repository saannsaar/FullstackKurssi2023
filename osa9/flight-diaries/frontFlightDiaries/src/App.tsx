import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Diary } from './types';
import diaryService from '../src/services/diaryService'
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);




  useEffect(() => {
   diaryService.getAllDiaries().then(data => {
    setDiaries(data)
   })
  }, [])


  return (
    <div>
      <DiaryList diaries={diaries} />
      <DiaryForm setDiaries={setDiaries} />
    </div>
  )
}



export default App;
