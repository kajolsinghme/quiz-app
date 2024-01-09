import React, { useState } from 'react'
import styles from './Home.module.css'

const Home = () => {
  const [username,setUsername] = useState('')
  console.log(username)
  function handleFormSubmit(e) {
    e.preventDefault()
    console.log(username)
    alert(`Hello ${username}! You can start the quiz.`)
    setUsername('')
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizContent}>
        <h1>Quiz Application</h1>
        <form className={styles.formContainer} onSubmit={handleFormSubmit}>
          <label htmlFor="username">Enter your name</label>
          <input type="text" name='username' value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
          <button type='submit'>Start</button>
        </form>
      </div>
    </div>
  )
}

export default Home