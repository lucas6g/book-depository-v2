import express, { Express } from 'express'
import { router } from './routes'
import env from './config/env'

const app: Express = express()

app.use(express.json())

app.use(router)

app.listen(env.app.port, () =>
  console.log(`Server is running on ${env.app.url}`)
)
