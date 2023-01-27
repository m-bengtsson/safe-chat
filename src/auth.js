import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { db } from './database.js'

dotenv.config()
const users = db.data.users

function authenticateUser(username, password) {
     // Tips: Array.some
     const found = users.find(user => user.username === username && user.password === password)

     return Boolean(found)
}

function createToken(name) {
     const user = { name: name }

     const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
     user.token = token
     console.log('createToken', user)
     return user
}


export { authenticateUser, createToken }