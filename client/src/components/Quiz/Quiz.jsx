import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = import.meta.env.BASE_URL;

const Quiz = () => {
  const [time, setTime] = useState(300);
  const [quesNo, setQuesNo] = useState(1);
  const [value, setValue] = useState('');
  const [quesData, setQuesData] = useState([]);
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [userAttemptId, setUserAttemptId] = useState(null);
  const [obtainedScoreSoFar, setObtainedScoreSoFar] = useState(0);

  const username = Cookies.get('username');
  console.log(baseUrl)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const questionData = await axios.get(`${baseUrl}/quiz/questions`);
        setQuesData(questionData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (quesNo > 10) {
      updateUserAttempt(true,'quizCompleted')
      window.location.href = '/result';
      return;
    }

    if (time === 0) {
      updateUserAttempt(true, 'quizCompleted');
      window.location.href = '/result';
      return;
    }
  }, [time,quesNo]);

  useEffect(() => {
    getUserAttempt();
  }, [username]);

  useEffect(() => {
    updateUserAttempt();
  }, [obtainedScoreSoFar, quesNo]);

  const formatTime = () =>{
    const minutes = Math.floor(time/60)
    const seconds = time % 60
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
  };

  const handleNextQuestion = () => {
    if (value !== '') {
      checkScore();
      setQuesNo((prev) => prev + 1);
      setCurrentQuesIndex((prevIndex) => prevIndex + 1);
      updateUserAttempt();
      setValue('')
    } else {
        toast.error('Please select an option before moving to the next question');
    }
  };

  const getUserAttempt = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/attempt/get`, {
        params: { username: username }
      });
      console.log(response.data)
      if (response.data) {
        const id = response.data._id;
        console.log(id)
        setUserAttemptId(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkScore = () => {
    const options = quesData[currentQuesIndex].options;
    const correctAnswerIndex = quesData[currentQuesIndex].correctAnswer;
    const selectedOptionIndex = options.indexOf(value);
    console.log('Correct Answer Index:', correctAnswerIndex);
    console.log('Selected Option Index:', selectedOptionIndex);
    if (selectedOptionIndex === correctAnswerIndex) {
      console.log('Answer is correct!');
      setObtainedScoreSoFar((prevScore) => prevScore + 10);
    } else {
      console.log('Answer is incorrect.');
    }
  };

  const updateUserAttempt = async (settled = false, lastAction = null) => {
    try {
      console.log(userAttemptId)
      if (userAttemptId) {
        const updatedData = {
          attemptedQuesSoFar: quesNo - 1,
          obtainedScoreSoFar: obtainedScoreSoFar,
          settled: settled,
          lastAction: lastAction,
        };

        await axios.put(`${baseUrl}/user/attempt/update/${userAttemptId}`, updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.quizContainer}>
        {quesNo <= 10 && (
          <>
            <h2>{quesNo}/10</h2>
            <div className={styles.timer}>{formatTime()}</div>
            <div className={styles.question}>
              {currentQuesIndex < quesData.length && (
                <p key={currentQuesIndex}>{quesData[currentQuesIndex].desc}</p>
              )}
            </div>
            <ul className={styles.options}>
              {currentQuesIndex < quesData.length &&
                quesData[currentQuesIndex].options.map((option, index) => (
                  <li key={index} className={styles.option}>
                    <label htmlFor={`q${index + 1}`}>
                      {option}
                      <input className={styles.input} type="radio" name="quizOption" id={`q${index + 1}`} value={option} onChange={(e) => setValue(e.target.value)} checked={value === option} />
                    </label>
                  </li>
                ))}
            </ul>
            <button className={styles.nextBtn} onClick={handleNextQuestion} >
              Next
            </button>
            <ToastContainer />
          </>
        )}
        {quesNo > 10 && (
          <>
            {updateUserAttempt(true, 'quizCompleted')}
            {window.location.href = '/result'}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
