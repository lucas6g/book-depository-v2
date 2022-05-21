export namespace MailProviderDto {
  export type Address = {
    email: string;
    name: string;
  };
  export type Message = {
    to: Address;
    from: Address;
    subject: string;
    text: string;
    html: string;
  };
}
