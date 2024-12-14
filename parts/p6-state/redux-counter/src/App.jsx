import { useSelector, useDispatch } from 'react-redux'

function App() {
  const count = useSelector(state=>state)
  const dispatch = useDispatch()
  return (
    <>
      <h1>Counter</h1>
      <p>count is: {count}</p>
      <div className="card">
        <button onClick={() => dispatch({type: 'UP'})}>Add</button>
        <button onClick={() => dispatch({type: 'DOWN'})}>Minus</button>
        <button onClick={() => dispatch({type: 'ZERO'})}>Reset</button>
      </div>
    </>
  )
}

export default App
