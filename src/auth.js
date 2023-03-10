import express from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { db } from './database.js'
import bcrypt from 'bcryptjs'

// Config
const salt = bcrypt.genSaltSync(10);
const app = express();
dotenv.config()
const users = db.data.users

// Authentication functions
function authenticateUser(username, password) {
     let match = users.find(user => user.username == username)
     if (!match) {
          console.log('> Wrong username\n')
     } else {
          // Compare hashed passwords
          let correctPassword = bcrypt.compareSync(password, match.password)
          if (correctPassword) {
               console.log('> Welcome user!', match.password)
          } else {
               console.log('> Password does not match.', match.password)
          }
     }
     return match
}

// Create jwt token based on username
function createToken(username) {
     const user = { username: username }
     const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
     user.token = token
     return user
}

// Cheack and verify token
function userIsAuthorized(req) {
     // Check
     let token = req.body.token || req.query.token
     if (!token) {
          let x = req.headers['authorization']
          if (x === undefined) {
               return false
          }
          token = x.substring(7)
     }
     // Verify
     if (token) {
          let decoded
          try {
               decoded = jwt.verify(token, process.env.SECRET)
          } catch (error) {
               console.log('Catch! incorrect token!!', error.message)
               return false
          }
          return decoded

     } else {
          return false
     }
}

export { authenticateUser, createToken, userIsAuthorized }