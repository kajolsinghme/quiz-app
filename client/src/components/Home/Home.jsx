import React, { useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Home = () => {
  const [username,setUsername] = useState('')
  const handleFormSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:5000/api/v1/users/quiz/start",{username:username})
      toast.success(response.data.message);
      Cookies.set('username', username);
      setTimeout(() => {
        window.location.href ='/quiz'
      }, 4000);

      }
      catch(error){
        console.error('Error starting quiz:', error);
        toast.error('Please enter a username to start the quiz.');
      }
    
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizContent}>
        <h1 className={styles.headingContainer}>Quiz Application</h1>
        <form className={styles.formContainer} onSubmit={handleFormSubmit}>
          <label htmlFor="username">Enter your name</label>
          <input className={styles.inputhome} type="text" name='username' value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
          <button className={styles.startBtn} type='submit'>Start</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Home