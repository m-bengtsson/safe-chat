import express from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { db } from './database.js'

// Config
const app = express();
dotenv.config()
const users = db.data.users

// Auth functions
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

function userIsAuthorized(req) {
     // JWT kan skickas antingen i request body, med querystring, eller i header: Authorization
     let token = req.body.token || req.query.token
     if (!token) {
          let x = req.headers['authorization']
          if (x === undefined) {
               return false
          }
          token = x.substring(7)
          // Authorization: Bearer JWT......
     }

     console.log('Token: ', token)
     if (token) {
          let decoded
          try {
               decoded = jwt.verify(token, process.env.SECRET)
          } catch (error) {
               console.log('Catch! Felaktig token!!', error.message)
               return false
          }
          console.log('decoded: ', decoded)
          return decoded

     } else {
          console.log('Ingen token')
          return false
     }
}




export { authenticateUser, createToken, userIsAuthorized }