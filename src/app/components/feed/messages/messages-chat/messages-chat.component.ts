import { AuthService } from './../../../../services/auth/auth.service';
import { MessageService } from 'src/app/services/message/message.service';
import ConversationResponsePayload from "src/app/models/response-dto/conversation-response.payload"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFileImage, faImage, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import MessageRequestPayload from 'src/app/models/request-dto/message-request.payload';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './messages-chat.component.html',
  styleUrls: ['./messages-chat.component.css']
})
export class MessagesChatComponent implements OnInit {

  imageIcon = faImage;
  fileImageIcon = faFileImage;
  sendMessageIcon = faPaperPlane;
  smileIcon = faSmile;

  message: string = '';

  @Input() conversation!: ConversationResponsePayload;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  messageRequestPayload: MessageRequestPayload;
  loggedUser: string = this.authService.getUsernameFromLocalStorage();

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {

    this.messageRequestPayload = {
      conversationId: 0,
      content: ""
    }
  }

  ngOnInit(): void {

    this.messageService.refreshNeeded$
      .subscribe(() => {
        this.getMessagesForConversation(this.conversation.id)
      })

  }

  // handleSelection(event: any) {
  //   this.message += event.char;
  // }

  submitMessage($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    // clean white space
    const value = element.value.trim();
    if (value.length < 1) return;
    // clean input
    element.value = '';
    // select message request payload
    this.messageRequestPayload.conversationId = this.conversation.id;
    this.messageRequestPayload.content = value;
    // send message to message service
    this.messageService
      .sendMessage(this.messageRequestPayload)
      .subscribe(() => console.log("message has been sent"));
  }

  getMessagesForConversation(conversationId: number) {
    this.messageService
      .getConversationById(conversationId)
      .subscribe((conversationResponse) => {
        this.conversation.latestMessageContent = conversationResponse.latestMessageContent;
        this.conversation.latestMessageTime = conversationResponse.latestMessageTime;
        this.conversation.messages = conversationResponse.messages;
      });
  }

  messageFromLoggedUser(senderUsername: string) {

    if (senderUsername == this.loggedUser) {
      return true;
    }
    return false;

  }

}
