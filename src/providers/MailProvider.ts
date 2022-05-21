import { MailProviderDto } from './MailProviderDto'

export interface MailProvider {
  sendMail(message: MailProviderDto.Message): Promise<void>;
}
