const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Please provide these arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://thibautlamm_db_user:${password}@cluster0.id796ej.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    if(name && number) {
      const person = new Person({
        name: name,
        number: number,
      })
      return person.save()
    }
    else
    {
      return Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        return result
      })
    }
  })
  .then(() => {
    if (name && number) {
      console.log(`added ${name} number ${number} to phonebook`)
    }

    return mongoose.connection.close()
  })

  .catch((err) => console.log(err))