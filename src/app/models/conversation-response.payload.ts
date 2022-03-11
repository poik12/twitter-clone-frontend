import MessageResponsePayload from "./message-response.payload";

export default interface ConversationResponsePayload {

  id: number,
  participantName: string,
  participantUsername: string,
  creatorName: string,
  creatorUsername: string,
  latestMessageTime: string,
  latestMessageContent: string,
  latestMessageRead: boolean,
  messages: Array<MessageResponsePayload>,

}
