const app = require('./app.js')
// const server = require('./socketio.js')

const mongoose = require('mongoose')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.q0nom.mongodb.net/chatea?retryWrites=true&w=majority`

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('connected to mongoDB')
    } catch (error) {
        console.error(error)
    }
}
connect()

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))
