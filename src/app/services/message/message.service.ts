import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import ConversationRequestPayload from 'src/app/models/request-dto/conversation-request.payload';
import ConversationResponsePayload from 'src/app/models/response-dto/conversation-response.payload';
import { tap } from 'rxjs/operators';
import MessageResponsePayload from 'src/app/models/response-dto/message-response.payload';
import MessageRequestPayload from 'src/app/models/request-dto/message-request.payload';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private ADD_CONVERSATION_URL = "http://localhost:8080/api/v1/conversations";
  private GET_CONVERSATIONS_URL = "http://localhost:8080/api/v1/conversations";
  private GET_CONVERSATION_BY_ID_URL = "http://localhost:8080/api/v1/conversations/";
  private POST_MESSAGE_URL = "http://localhost:8080/api/v1/conversations/messages";
  private GET_MESSAGES_FOR_CONVERSATION_BY_ID_URL = "http://localhost:8080/api/v1/conversations/messages/";

  private pageSize: number = 10;

  // After sending message refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  addUserToConversation(
    conversationRequestPaylaod: ConversationRequestPayload
  ): Observable<any> {
    return this.httpClient.post<any>(this.ADD_CONVERSATION_URL, conversationRequestPaylaod);
  }

  getAllConversations(pageNumber: number): Observable<Array<ConversationResponsePayload>> {
    return this.httpClient.get<Array<ConversationResponsePayload>>(
      this.GET_CONVERSATIONS_URL + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  getConversationById(conversationId: number): Observable<ConversationResponsePayload> {
    return this.httpClient.get<ConversationResponsePayload>(this.GET_CONVERSATION_BY_ID_URL + conversationId);
  }

  sendMessage(messageRequestPayload: MessageRequestPayload): Observable<MessageResponsePayload> {
    return this.httpClient
      .post<any>(this.POST_MESSAGE_URL, messageRequestPayload);
  }

  getMessagesForConversationById(conversationId: number, pageNumber: number): Observable<MessageResponsePayload[]> {
    return this.httpClient.get<MessageResponsePayload[]>(
      this.GET_MESSAGES_FOR_CONVERSATION_BY_ID_URL + conversationId + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }
}
