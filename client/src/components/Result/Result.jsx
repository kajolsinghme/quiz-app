import React, { useState, useEffect } from 'react';
import styles from './Result.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = import.meta.env.BASE_URL;

const Result = () => {
  const [userAttemptId, setUserAttemptId] = useState(null);
  const [totalAttemptedQues, setTotalAttemptedQues] = useState(0);
  const [totalEarnedPoint, setTotalEarnedPoint] = useState(0);
  const username = Cookies.get('username');

  useEffect(() => {
    getUserAttempt();
  }, [username]);


  useEffect(()=>{
    const getUserAttemptData = async()=>{
      try{
        console.log(userAttemptId)
        if(userAttemptId){
          const userAttemptData = await axios.get(`${baseUrl}/user/attempt/get/${userAttemptId}`)
          console.log(userAttemptData)
          console.log(userAttemptData.data.attemptedQuesSoFar)
          setTotalAttemptedQues(userAttemptData.data.attemptedQuesSoFar);
          setTotalEarnedPoint(userAttemptData.data.obtainedScoreSoFar);
          console.log(totalAttemptedQues)
          console.log(totalEarnedPoint)
          }
      }
      catch(error){
        console.log(error)
      }
    }
    getUserAttemptData()
  },[userAttemptId])

  const getUserAttempt = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/attempt/get`, {
        params: { username: username },
      });
      console.log(response.data)
      if (response.data) {
        const id = response.data._id;
        console.log(id)
        setUserAttemptId(id);
        console.log(userAttemptId)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const copyText = async () => {
    const resultLink = window.location.href;
    try {
      await navigator.clipboard.writeText(resultLink)
      toast.success('Link copied to clipboard')

    } catch (error) {
      console.error('Unable to copy link to clipboard:', error)
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.resultContainer}>
        <h1>Quiz Result</h1>
        <div className={styles.resultInfo}>
          <p>Username: <span>{username}</span></p>
          <p>Total Quiz Points: <span>100</span></p>
          <p>Total Questions: <span>10</span></p>
          <p>Total Attempted Questions: <span>{totalAttemptedQues}</span></p>
          <p>Total Earned Points: <span>{totalEarnedPoint}</span></p>
          <p>Result: <span>{totalEarnedPoint>=50 ? 'PASSED' : 'FAILED'}</span></p>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={()=>window.location.href="/"}>Go to Home</button>
          <button onClick={copyText}>Copy Link</button>
        </div>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Result