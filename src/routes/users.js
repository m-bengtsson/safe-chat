import express from "express";

const router = express.Router()

const users = [
     {
          username: "matilda",
          password: '',
          id: 1
     },
     {
          username: "kate",
          password: '',
          id: 2
     }
]

// Routes
router.get('/', (req, res) => {
     console.log('GET/ users')
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


export default router

