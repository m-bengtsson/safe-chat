import express from 'express'
import * as dotenv from 'dotenv'
import * as url from 'url';
import channels from './routes/channels.js'
import users from './routes/users.js'

// Configuration
const app = express()
dotenv.config()
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))


// Middleware
const logger = (req, res, next) => {
     console.log(`${req.method} ${req.url}`, req.body)
     next()
}

app.use(express.json())
app.use(logger)
app.use(express.static(staticPath))
app.use('/api/users', users)
app.use('/api/channels', channels)

export { app }


// TODO: 
// post
// koppla till frontend





