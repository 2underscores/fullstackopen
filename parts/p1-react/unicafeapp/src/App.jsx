import { useState } from 'react'

const Button = (props) => {
  const {text, handleClick} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const FeedbackForm = (props) => {
  const {submitFeedback} = props;
  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button text='Good' handleClick={()=>{submitFeedback('good')}}/>
        <Button text='Neutral' handleClick={()=>{submitFeedback('neutral')}}/>
        <Button text='Bad' handleClick={()=>{submitFeedback('bad')}}/>
      </div>
    </>
  )
}

const FeedbackStats = (props) => {
  const {feedback} = props;
  const total = feedback.good + feedback.neutral + feedback.bad;
  const statHeader = <h1>Statistics</h1>
  return (
    total ? 
      <>
        {statHeader}
        <p>{`good: ${feedback.good}`}</p>
        <p>{`neutral: ${feedback.neutral}`}</p>
        <p>{`bad: ${feedback.bad}`}</p>
        <p>{`all: ${total}`}</p>
        <p>{`average: ${(feedback.good - feedback.bad) / total}`}</p>
        <p>{`positive: ${feedback.good / total} %`}</p>
      </>
    :
    <>
      {statHeader}
      <p>No feedback given.</p>
    </>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({'good': 0, 'neutral': 0, 'bad': 0, });
  
  function submitFeedback(type) {
    const newFeedback = {...feedback, [type]: 1+feedback[type]};
    console.log(newFeedback);
    setFeedback(newFeedback);
  }

  return (
    <>
      <FeedbackForm submitFeedback={submitFeedback}/>
      <FeedbackStats feedback={feedback}/>
    </>
  )
}

export default App