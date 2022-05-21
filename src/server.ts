import express, { Express } from 'express'
import cors from 'cors'
import { router } from './routes'
import env from './config/env'

const app: Express = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(router)

app.listen(env.app.port, () =>
  console.log(`Server is running on port ${env.app.port}`)
)
