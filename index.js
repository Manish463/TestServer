import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(express.json()) // this is an important line to do a post request

// Initializing Environement variable
const port = process.env.PORT || 3000
const uri = process.env.URI

// Connecting backend with database
mongoose.connect(uri).then(() => {
    console.log("Connection Succesful")
}).catch((err) => {
    console.error("Failed to connect:", err)
})

const db = mongoose.connection

app.get('/', (req, res) => {
    res.send('<h1>Hello World2!</h1>')
})

app.post('/', async (req, res) => {
    let data = req.body
    console.log("New object:", data)
    await db.collection('test').insertOne(data) // Inserting data to the db
    res.send({message: "Response from root", data})
})

app.get('/new', (req, res) => {
    res.send('<h1>New Page</h1>')
})

app.post('/new', async (req, res) => {
    let data = req.body
    console.log("New object:", data)
    await db.collection('test').insertOne(data) // Inserting data to the db
    res.send({message: "Response from new", data})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app