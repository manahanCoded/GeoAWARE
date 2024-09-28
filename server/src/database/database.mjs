import pg from "pg"
import env from "dotenv"

env.config()

const db = new pg.Client({
        user: process.env.userPG,
        host: process.env.hostPG,
        password: process.env.passwordPG,
        database: process.env.databasePG,
        port: process.env.portPG
})

db.connect()

export default db