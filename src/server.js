import express from 'express'
import * as dotenv from 'dotenv'
//import { channels } from './database.js'
import users from './routes/users.js'

const app = express()
dotenv.config()

// Middleware
const logger = (req, res, next) => {
     console.log(`${req.method} ${req.url}`, req.body)
     next()
}

app.use(express.json())
app.use(logger)
// app.use('/api/users', users)

app.use('/api/users', users)
// app.use('/api/channels', channels)



export { app }





