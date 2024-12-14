import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {goodReview, okReview, badReview, resetStats, store} from './reducer'


console.log(`Rendering outside`);
const App = () => {
  console.log(`Rendering inside`);
  const [value, setValue] = useState('test')
  const handleNativeInputChange = (e) => {
    console.log("Browser DOM attempted to change value to:", e.target.value);
  };
  const handleReactInputChange = (e) => {setValue(e.target.value)};
  
  return (
    <><div>
      <button onClick={goodReview}>good</button> 
      <button onClick={okReview}>ok</button> 
      <button onClick={badReview}>bad</button>
      <button onClick={resetStats}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
    <div>
      <input value={value} onInput={handleNativeInputChange}></input>
      <input value={value} onInput={handleNativeInputChange} onChange={handleReactInputChange}></input>
      <input defaultValue={value} onInput={handleNativeInputChange}></input>
    </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
