const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

const dbConnection = require('./db')
const DbConn = require('./db')
const { response } = require('express')

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/insert', (req, res) =>  {
    const { isbn, title, subtitle, summary, price } = req.body
    const db = DbConn.getDbConnInst()
    const result = db.insertBookData(isbn, title, subtitle, summary, price)

    result
        .then(data => res.json({ success: true }))
        .catch(err => console.log(err))
})

app.get('/books', (req, res) =>  {
    const db = DbConn.getDbConnInst()
    
    const result = db.getData()
    result
        .then(data => res.json({ data: data}))
        .catch(err => console.log(err))
})

app.listen(process.env.PORT, () => {
    console.log('App is running!')
} )