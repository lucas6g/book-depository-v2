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
