import express from 'express'
import { db } from '../database.js'
import { isNonEmptyString } from '../validation.js';
import { userIsAuthorized } from '../auth.js';
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);
const router = express.Router()
const users = db.data.users;

// Routes
router.get('/', (req, res) => {
     let decoded = userIsAuthorized(req)
     if (!userIsAuthorized(req)) {
          res.sendStatus(401)
          return
     }
     console.log(decoded)
     res.status(200).send(decoded)
     // console.log('')
})

router.get('/:id', (req, res) => {
     const id = req.params.id;
     console.log('GET/ users/ id')

     let maybeUser = users.find(user => user.username === id)

     if (maybeUser) {
          res.status(200).send(maybeUser)
     } else {
          res.status(400).send('Tried to GET user with unexisting id')
     }
     // console.log('')
})

router.post('/', (req, res) => {
     let { username, password } = req.body
     let sameId = users.find(user => user.username === username)
     let hashedPassword = bcrypt.hashSync(password, salt)
     password = hashedPassword

     if (!isNonEmptyString(username, password)) {
          res.sendStatus(400)
          return
     } else if (sameId !== undefined) {
          console.log('POST Duplicate id')
          res.sendStatus(400)
          return
     } else {
          users.push({ username, password })
          res.status(200).send(users)
     }
     console.log('POST / ', users)
     db.write()
})

export default router

