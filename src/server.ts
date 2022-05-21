import express, { Express } from 'express'
import cors from 'cors'
import { router } from './routes'
import { env } from 'process'

const app: Express = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(router)

const port = env.PORT || 5001
app.listen(port, () => console.log(`Server is running on port ${port}`))

console.log(`Database URL: ${env.DATABASE_URL}`)
console.log(`Email host: ${env.MAIL_HOST}`)
console.log(`Email port: ${env.MAIL_PORT}`)
console.log(`Email user: ${env.MAIL_USER}`)
console.log(`Email password: ${env.MAIL_PASSWORD}`)
console.log(`Email from: ${env.MAIL_FROM}`)
console.log(`Environment: ${env.NODE_ENV}`)
