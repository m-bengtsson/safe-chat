import express from 'express'
import * as dotenv from 'dotenv'

const app = express()

dotenv.config()
const PORT = process.env.PORT




app.listen(PORT, () => {
     console.log(`Listening on port ${PORT}...`)
})


