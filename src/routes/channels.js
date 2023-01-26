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
     const name = req.params.channelName;
     const maybeChannel = channels.find(channel => channel.channelName === name)
     if (maybeChannel) {
          res.status(200).send(maybeChannel)
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

export default router


// isPublic ?
// Delete messages