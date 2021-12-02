import React from 'react'

const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Content = ({ parts }) => (
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>
)

const Total = ({ parts }) => {
    const sum = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)

    return (
        <b>total of {sum} exercises</b>
    )
}


const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Course = ({ course }) => (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course