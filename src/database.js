import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file)
const db = new Low(adapter)


await db.read()

/* console.log('The database contains: ', db.data)

if (db.data === null) {
     db.data = [
          { name: 'Matilda', password: "hej123" },
          { name: 'Kate', password: "123hej" }
     ]
     await db.write()
}

async function addUser(name, password) {
     db.data.push({
          name: name,
          password: password
     })
     await db.write()
}

async function removeUser(name) {
     db.data = db.data.filter(user => user != user.name)
     await db.write()
}

removeUser('Matilda')
addUser('lovisa', "hej789") */


export { db } 