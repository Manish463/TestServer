import express from 'express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // this is an important line to do a post request

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.post('/', (req, res) => {
    let data = req.body
    console.log("New object:", data)
    res.send({message: "Response from root", data})
})

app.get('/new', (req, res) => {
    res.send('<h1>New Page</h1>')
})

app.post('/new', (req, res) => {
    let data = req.body
    console.log("New object:", data)
    res.send({message: "Response from new", data})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app