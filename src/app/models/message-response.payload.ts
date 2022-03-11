export default interface MessageResponsePayload {

  content: String,
  senderId: number,
  recipientId: number
  createdAt: String,

  loggedUser: boolean,

}
