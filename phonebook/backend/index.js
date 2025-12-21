require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())

app.use(express.static('build'))

morgan.token('body', (req) => {
  // Because JSON.stringify returns '{}' if req.body is empty, no need to put a condition tester if else
  return JSON.stringify(req.body)
})

app.use(express.json())

// Following internet, tiny is equivalent to ':method :url :status :res[content-length] - :response-time ms'. I just needed to add body at the end.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.code === 11000) { // Following Google, error associated to the unique key is 11000
    return response.status(409).json({
      error: `Name '${request.body.name}' already exists. Name must be unique.`
    })
  }

  next(error)
}

app.get('/info', (request, response, next) => {
  const requestTime = new Date()

  Person
    .countDocuments({}).then(count => { response.send(` <p>Phonebook has info for ${count} people</p><p>${requestTime}</p>`)})
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const personToAdd = new Person({
    name: body.name,
    number: body.number,
  })

  personToAdd
    .save()
    .then(savedPerson => {response.json(savedPerson)})
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})