const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as a third argument (node mongo.js "password")')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =  `mongodb+srv://wilmadoggydog:${password}@cluster0.8ap2tel.mongodb.net/testi?retryWrites=true&w=majority`
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if ( process.argv.length === 3 ) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
} else {
    
  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
