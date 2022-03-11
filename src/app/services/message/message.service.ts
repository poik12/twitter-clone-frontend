import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import ConversationRequestPayload from 'src/app/models/conversation-request.payload';
import MessageRequestPayload from 'src/app/models/message-request.payload';
import ConversationResponsePayload from 'src/app/models/conversation-response.payload';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private ADD_CONVERSATION = "http://localhost:8080/api/v1/messages"
  private GET_CONVERSATIONS = "http://localhost:8080/api/v1/messages"
  private SEND_MESSAGE = "http://localhost:8080/api/v1/messages/"

  // add refresh

  constructor(
    private httpClient: HttpClient
  ) { }

  addConversation(
    conversationRequestPaylaod: ConversationRequestPayload
  ): Observable<any> {
    return this.httpClient.post(this.ADD_CONVERSATION, conversationRequestPaylaod);
  }

  getAllConversations(): Observable<Array<ConversationResponsePayload>> {
    return this.httpClient.get<Array<ConversationResponsePayload>>(this.GET_CONVERSATIONS);
  }

  sendMessage(
    username: string,
    messageRequestPayload: MessageRequestPayload
  ): Observable<any> {
    return this.httpClient.post(this.SEND_MESSAGE + username, messageRequestPayload);
  }
}
