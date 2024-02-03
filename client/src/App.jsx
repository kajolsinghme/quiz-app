import React from 'react'
import Home from './components/Home/Home'
import Quiz from './components/Quiz/Quiz'
import Result from './components/Result/Result'
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/quiz' element={<Quiz/>} />
      <Route path='/result' element={<Result/>}/>
    </Routes>
  )
}

export default App