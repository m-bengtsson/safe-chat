import express from 'express'
import { db } from '../database.js'

const router = express.Router()
const users = db.data.users;

// Routes
router.get('/', (req, res) => {

     console.log('GET/ users', users)
     res.status(200).send(users)
})

router.get('/:id', (req, res) => {
     const id = Number(req.params.id);
     console.log('GET/ users/ id')

     // TODO: valideringsfunktion för att se om det är en sträng eller nummer

     let maybeUser = users.find(user => user.id === id)
     if (maybeUser) {
          res.status(200).send(maybeUser)
     } else {
          res.status(400).send('Tried to GET user with unexisting id')
     }
})

/* app.get('/secret', (req, res) => {
     // JWT kan skickas antingen i request body, med querystring, eller i header: Authorization
     let token = req.body.token || req.query.token
     if (!token) {
          let x = req.headers['authorization']
          if (x === undefined) {
               // Vi hittade ingen token, authorization fail
               res.sendStatus(401)
               return
          }
          token = x.substring(7)
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
}) */
// POST user login and register
// DELETE USER




export default router

