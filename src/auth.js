import express from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { db } from './database.js'


const app = express();
dotenv.config()
const users = db.data.users

function authenticateUser(username, password) {

     const found = users.find(user => user.username === username && user.password === password)
     return Boolean(found)
}

function createToken(username) {
     const user = { username: username }

     const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
     user.token = token
     console.log('createToken', user)
     return user
}

// TODO: FÖRSTÅ DETTA
// GET /secret
/* app.get('/secret', (req, res) => {
     // JWT kan skickas antingen i request body, med querystring, eller i header: Authorization
     let token = req.body.token || req.query.token
     if (!token) {
          let header = req.headers['authorization']
          if (header === undefined) {
               // Vi hittade ingen token, authorization fail
               res.sendStatus(401)
               return
          }
          token = header.substring(7)
          // Authorization: Bearer JWT......
          // substring(7) för att hoppa över "Bearer " och plocka ut JWT-strängen
     }

     console.log('Token: ', token)
     if (token) {
          let decoded
          try {
               decoded = jwt.verify(token, process.env.SECRET)
          } catch (error) {
               console.log('Catch! Felaktig token!!')
               res.sendStatus(401)
               return
          }
          console.log('decoded: ', decoded)
          res.send('You have access to the secret stuff.')

     } else {
          console.log('Ingen token')
          res.sendStatus(401)  // Unauthorized
     }
})
 */



export { authenticateUser, createToken }