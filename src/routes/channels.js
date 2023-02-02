import express from 'express'
import { db } from '../database.js'
import { isNonEmptyString } from '../validation.js'
import { userIsAuthorized } from '../auth.js'

const router = express.Router()
const channels = db.data.channels

// Routes
router.get('/', (req, res) => {
     // console.log('GET/ channels')
     res.status(200).send(channels)
})

router.get('/:name', (req, res) => {
     // console.log('GET /')
     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     if (maybeChannel) {
          res.status(200).send(maybeChannel)
     } else {
          res.sendStatus(400)
     }
})

router.get('/:name/:messages', (req, res) => {
     // console.log('GET/ channels')
     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     const messages = maybeChannel.messages
     console.log('GET /channels/name/messages', maybeChannel.messages)
     if (messages) {
          res.status(200).send(messages)
     } else {
          res.sendStatus(400)
     }
})

// Create/post channel
router.post('/', (req, res) => {
     if (!userIsAuthorized(req)) {
          res.sendStatus(401)
          return
     }
     // Ta reda på om användaren är inloggad innan man får skapa kanal
     // Här behövs inte kontrollering av dubletter iom att man ska kunna ska vilken kanal som helst
     const { channelName, status, messages: [{ timeCreated, username }] } = req.body;

     channels.push({ channelName, status, messages: [{ timeCreated, username }] })
     res.status(200).send(channels)
     console.log('POST / ',)
})

// post message
router.post('/:name/', (req, res) => {
     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     console.log('Channel', maybeChannel)
     const messages = maybeChannel.messages
     const { timeCreated, username, text } = req.body

     if (!isNonEmptyString(text)) {
          res.sendStatus(400)
          return
     } else {
          console.log('messages: ', messages)
          messages.push({ timeCreated, username, text })
          db.write()
          res.status(200).send(messages)
     }
     console.log('POST / ', text)

})

export default router


// isPublic ?
// Delete messages