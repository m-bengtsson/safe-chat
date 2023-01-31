import express from 'express'
import { db } from '../database.js'
import { isNonEmptyString } from '../validation.js';
import { userIsAuthorized } from '../auth.js';

const router = express.Router()
const users = db.data.users;

// Routes
router.get('/', (req, res) => {
     let decoded = userIsAuthorized(req)
     if (!userIsAuthorized(req)) {
          res.sendStatus(401)
          return
     }
     console.log('GET/ users', decoded)
     res.status(200).send(decoded)
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
})

router.post('/', (req, res) => {
     const { username, password } = req.body

     if (!isNonEmptyString(username, password)) {
          res.sendStatus(400)
          return
     } else {
          users.push({ username, password })
          res.status(200).send(users)
     }
     console.log('POST / ', users)
})

export default router

