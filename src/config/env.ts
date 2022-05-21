import 'dotenv/config'

export default {
  app: {
    env: String(process.env.NODE_ENV) || 'dev',
    port: Number(process.env.APP_PORT) || 5000,
    host: String(process.env.APP_HOST) || 'localhost',
    url:
      process.env.APP_URL ||
      `http://${process.env.APP_HOST}:${process.env.APP_PORT}`
  }
}
