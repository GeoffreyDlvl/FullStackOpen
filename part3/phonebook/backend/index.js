require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req, res) => (
    req.method === 'POST'
        ? JSON.stringify(req.body)
        : ''
))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>
        response.json(persons))
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const infoText =
            `<p>Phonebook has info for ${persons.length} people</p>
             <p>${new Date()}</p>`
        response.send(infoText)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => response.json(person))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Name or number missing"
        })
    }

    Person.find({ name: body.name })
        .then(match => {
            if (match.length > 0) {
                return response.status(400).json({
                    error: "Name already exists"
                })
            } else {
                const newPerson = new Person({
                    name: body.name,
                    number: body.number
                })
                newPerson.save()
                return response.json(newPerson)
            }
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        number: request.body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error)

    // error handling here
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})