import express from 'express'
import * as dotenv from 'dotenv'
import * as url from 'url';
import channels from './routes/channels.js'
import users from './routes/users.js'
import { authenticateUser, createToken } from './auth.js';
import bcrypt from 'bcryptjs'

// Configuration
const salt = bcrypt.genSaltSync(10);
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

// POST /login 
app.post('/login', (req, res) => {
     let { username, password } = req.body

     if (authenticateUser(username, password)) {
          const userToken = createToken(username)
          res.status(200).send(userToken)
     } else {
          res.sendStatus(401)  // Unauthorized
          return
     }
})

export { app }





