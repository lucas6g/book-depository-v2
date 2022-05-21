import env from '../../config/env'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { MailProviderDto } from '../MailProviderDto'
import { MailProvider } from '../MailProvider'

export class MailProviderNodemailer implements MailProvider {
  private transporter: Mail

  constructor () {
    if (env.app.env === 'prod') {
      this.transporter = nodemailer.createTransport({
        host: env.mail.host,
        port: env.mail.port as number,
        secure: false,
        auth: { user: env.mail.user, pass: env.mail.pass }
      })
    } else {
      this.transporter = nodemailer.createTransport({
        host: env.maildev.host,
        port: env.maildev.port as number,
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
