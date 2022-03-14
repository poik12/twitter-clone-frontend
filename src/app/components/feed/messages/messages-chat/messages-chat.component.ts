import MessageResponsePayload from 'src/app/models/response-dto/message-response.payload';
import { AuthService } from './../../../../services/auth/auth.service';
import { MessageService } from 'src/app/services/message/message.service';
import ConversationResponsePayload from "src/app/models/response-dto/conversation-response.payload"
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faFileImage, faImage, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import MessageRequestPayload from 'src/app/models/request-dto/message-request.payload';
import { NgxSpinnerService } from 'ngx-spinner';

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
  @Input() messageList: MessageResponsePayload[] = [];

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  messageRequestPayload: MessageRequestPayload;
  loggedUser: string = this.authService.getUsernameFromLocalStorage();

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherTweetPage: boolean = true;
  notScrollable: boolean = true;

  @ViewChild("messsageContainer") messageContainer!: ElementRef;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {

    this.messageRequestPayload = {
      conversationId: 0,
      content: ""
    }
  }

  ngOnInit(): void {

    this.messageService.refreshNeeded$
      .subscribe(() => {
        this.getConversationById(this.conversation.id)
      })


    // this.messageService.refreshNeeded$
    //   .subscribe(() => {
    //     this.messageList = [];
    //     this.getMessagesForConversationById(this.conversation.id, 0);
    //   })

    // this.getMessagesForConversationById(this.conversation.id, 0);
  }

  ngAfterViewInit() {
    // this.scrollToBottom();
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  getConversationById(conversationId: number) {
    this.messageService
      .getConversationById(conversationId)
      .subscribe((conversationResponse) => {
        this.conversation.latestMessageContent = conversationResponse.latestMessageContent;
        this.conversation.latestMessageTime = conversationResponse.latestMessageTime;
      });
  }

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
      .subscribe((messageResponse) => {
        // add sent message to message list
        this.messageList.push(messageResponse);
        let latestMessageContent = messageResponse.content;
        if (latestMessageContent.length > 25) {
          latestMessageContent = latestMessageContent.substring(0, 25) + "...";
        }
        this.conversation.latestMessageContent = latestMessageContent;
        this.conversation.latestMessageTime = messageResponse.createdAt;
        this.scrollToBottom();
      });
  }

  private scrollToBottom() {
    // after adding new message scroll down
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  // When scrolling posts activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherTweetPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextMessagePage();
    }
  }

  private loadNextMessagePage() {
    // add page and size
    this.getMessagesForConversationById(this.conversation.id, this.currentPageNumber++);
  }

  private getMessagesForConversationById(conversationId: number, pageNumber: number) {
    this.messageService
      .getMessagesForConversationById(conversationId, pageNumber)
      .subscribe((messageResponse) => {

        if (messageResponse.length === 0) {
          this.notEmptyAnotherTweetPage = false;
          this.spinner.hide();
        }

        // this.messageList = [...this.messageList, ...messageResponse];
        messageResponse.forEach(message => {
          this.messageList.unshift(message);
          // this.messageList.concat(message);
        });

        this.notScrollable = true;
      });
  }

  messageFromLoggedUser(senderUsername: string) {
    if (senderUsername == this.loggedUser) {
      return true;
    }
    return false;
  }

}
