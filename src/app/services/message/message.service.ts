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

  private ADD_CONVERSATION_URL = "http://localhost:8080/api/v1/messages";
  private GET_CONVERSATIONS_URL = "http://localhost:8080/api/v1/messages";
  private SEND_MESSAGE_URL = "http://localhost:8080/api/v1/messages/send";
  private GET_CONVERSATION_BY_ID_URL = "http://localhost:8080/api/v1/messages/";

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

  getAllConversations(): Observable<Array<ConversationResponsePayload>> {
    return this.httpClient.get<Array<ConversationResponsePayload>>(this.GET_CONVERSATIONS_URL);
  }

  sendMessage(messageRequestPayload: MessageRequestPayload): Observable<any> {
    return this.httpClient
      .post<any>(this.SEND_MESSAGE_URL, messageRequestPayload)
      .pipe(tap(() => this._refreshNeeded$.next()));
  }

  getConversationById(conversationId: number): Observable<ConversationResponsePayload> {
    return this.httpClient.get<ConversationResponsePayload>(this.GET_CONVERSATION_BY_ID_URL + conversationId);
  }
}
