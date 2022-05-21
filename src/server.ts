import express, { Express } from 'express'
import cors from 'cors'
import { router } from './routes'

const app: Express = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(router)

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Server is running on port ${port}`))

console.log(`Database URL: ${process.env.DATABASE_URL}`)
console.log(`Email host: ${process.env.MAIL_HOST}`)
console.log(`Email port: ${process.env.MAIL_PORT}`)
console.log(`Email user: ${process.env.MAIL_USER}`)
console.log(`Email password: ${process.env.MAIL_PASSWORD}`)
console.log(`Email from: ${process.env.MAIL_FROM}`)
console.log(`Environment: ${process.env.NODE_ENV}`)
