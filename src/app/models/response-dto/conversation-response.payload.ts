import MessageResponsePayload from "./message-response.payload";

export default interface ConversationResponsePayload {

  id: number,
  participantName: string,
  participantUsername: string,
  participantProfilePicture: any;
  creatorName: string,
  creatorUsername: string,
  creatorProfilePicture: any;
  latestMessageTime: string,
  latestMessageContent: string,
  latestMessageRead: boolean,
  messages: Array<MessageResponsePayload>,

}
