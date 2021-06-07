import { MessagingProtocol } from './protocols/MessagingProtocol';

export class Messaging implements MessagingProtocol {
  sendMessage(msg: string): void {
    console.log(msg);
  }
}
