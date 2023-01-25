import { app } from './server.js'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = 8080;//process.env.PORT

app.listen(PORT, () => {
     console.log(`Listening on port ${PORT}`)
})