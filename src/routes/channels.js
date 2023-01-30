
import express from 'express'
import { db } from '../database.js'

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

router.post('/', (req, res) => {
     // Ta reda på om användaren är inloggad innan man får skapa kanal
     // Här behövs inte kontrollering av dubletter iom att man ska kunna ska vilken kanal som helst
     const { channelName, status, messages: [{ timeCreated, userId }] } = req.body;
     // Lägg till datum på time created

     channels.push({ channelName, status, messages: [{ timeCreated, userId }] })
     res.status(200).send(channels)
     console.log('POST / ',)
})

router.post('/:name/', (req, res) => {
     const name = req.params.name;
     const maybeChannel = channels.find(channel => channel.channelName == name)
     const messages = maybeChannel.messages

     const { timeCreated, userId } = req.body;

     messages.push({ timeCreated, userId })
     res.status(200).send(messages)
     console.log('POST / ',)
})

export default router


// isPublic ?
// Delete messages