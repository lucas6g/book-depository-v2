import 'dotenv/config'

export default {
  app: {
    env: String(process.env.NODE_ENV) || 'dev',
    port: Number(process.env.APP_PORT) || 5000
  },
  mail: {
    host: String(process.env.MAIL_HOST) || '',
    port: Number(process.env.MAIL_PORT) || 587,
    user: String(process.env.MAIL_USER) || '',
    pass: String(process.env.MAIL_PASSWORD) || '',
    from: String(process.env.MAIL_FROM) || ''
  },
  maildev: {
    host: String(process.env.MAILDEV_HOST) || '',
    port: String(process.env.MAILDEV_PORT) || 1025
  },
  jwt: {
    secret: String(process.env.JWT_SECRET) || '',
    expiresIn: String(process.env.JWT_EXPIRES_IN) || ''
  }
}
