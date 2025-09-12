import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(express.json()) // this is an important line to do a post request //

// Initializing Environement variable //
const port = process.env.PORT || 3000
const uri = process.env.URI

// Connecting backend with database //
mongoose.connect(uri).then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.error("Failed to connect:", err)
})

// With mongoose we have to use model //
const TestSchema = new mongoose.Schema({}, { strict: false })
const TestModel = mongoose.models.Test || mongoose.model("Test", TestSchema)

app.get('/', (req, res) => {
    res.send('<h1>Test Server</h1>')
})

app.post('/', async (req, res) => {
    const data = req.body
    console.log("New object:", data)
    try {
        const newDoc = await TestModel.create(data)
        res.json({ message: "Inserted successfully", newDoc })
    } catch (error) {
        console.error("Insert error:", error)
        res.status(500).json({ message: "Error inserting data", error })
    }
})

app.post('/newpage', async (req, res) => {
    const data = req.body
    console.log("New object:", data)
    try {
        const newDoc = await TestModel.create(data)
        res.json({ message: "Inserted successfully", newDoc })
    } catch (error) {
        console.error("Insert error:", error)
        res.status(500).json({ message: "Error inserting data", error })
    }
})

// We don't need this for vercel deployment //
// app.listen(port, () => {
//     console.log(port)
// })

export default app