import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { MailProviderDto } from '../MailProviderDto'
import { MailProvider } from '../MailProvider'

export class MailProviderNodemailer implements MailProvider {
  private transporter: Mail

  constructor () {
    if (String(process.env.NODE_ENV) === 'prod') {
      this.transporter = nodemailer.createTransport({
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: String(process.env.MAIL_USER),
          pass: String(process.env.MAIL_PASSWORD)
        }
      })
      console.log('Mail provider: nodemailer')
      console.log(`Mail host: ${process.env.MAIL_PORT}`)
    } else {
      this.transporter = nodemailer.createTransport({
        host: String(process.env.MAILDEV_HOST),
        port: Number(process.env.MAILDEV_PORT),
        secure: false,
        tls: { rejectUnauthorized: false }
      })
    }
  }

  async sendMail (message: MailProviderDto.Message): Promise<void> {
    await this.transporter.sendMail({
      to: { name: message.to.name, address: message.to.email },
      from: { name: message.from.name, address: message.from.email },
      subject: message.subject,
      text: message.text,
      html: message.html
    })
  }
}
