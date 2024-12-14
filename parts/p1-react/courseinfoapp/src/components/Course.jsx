const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content parts={course.parts}></Content>
      <Total total={course.parts.reduce((acc, val) => acc + val.exercises, 0)}></Total>
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(p =>
        <Part key={p.id} part={p.name} exercises={p.exercises}></Part>
      )}
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  // debugger
  return (
    <p style={{ "fontWeight": "bold" }}>Number of exercises {props.total}</p>
  )
}

export default Course