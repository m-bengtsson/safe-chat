import express from 'express'
import { db } from '../database.js'
import { isNonEmptyString } from '../validation.js'
import { userIsAuthorized } from '../auth.js'


const router = express.Router()
const channels = db.data.channels

// Routes
router.get('/', (req, res) => {
     res.status(200).send(channels)
})

// Get channeldata
router.get('/:name', (req, res) => {

     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     if (maybeChannel) {
          res.status(200).send(maybeChannel)
     } else {
          res.sendStatus(400)
     }
})

// Get messagedata from specific channel
router.get('/:name/:messages', (req, res) => {

     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     const messages = maybeChannel.messages
     if (messages) {
          res.status(200).send(messages)
     } else {
          res.sendStatus(400)
     }
})

// Create channel
router.post('/', (req, res) => {
     // Ta reda på om användaren är inloggad innan man får skapa kanal
     if (!userIsAuthorized(req)) {
          res.sendStatus(401)
          return
     }
     // Skickar in data till vår databas
     const { channelName, status, messages: [{ timeCreated, username }] } = req.body;

     channels.push({ channelName, status, messages: [{ timeCreated, username }] })
     db.write()
     res.status(200).send(channels)
})

// Create/send message to specific channel
router.post('/:name/', (req, res) => {

     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     const messages = maybeChannel.messages
     const { timeCreated, username, text } = req.body

     if (!isNonEmptyString(text)) {
          res.sendStatus(400)
          return

     } else {
          messages.push({ timeCreated, username, text })
          db.write()
          res.status(200).send(messages)
     }
})

export default router
