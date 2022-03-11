import { MessageService } from 'src/app/services/message/message.service';
import ConversationResponsePayload from "src/app/models/conversation-response.payload"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFileImage, faImage, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import MessageRequestPayload from 'src/app/models/message-request.payload';

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

  toggledEmojiPicker: boolean = false;
  message: string = '';

  // should be conversation response payload
  // @Input() conversation!: ConversationResponsePayload;
  @Input() conversation!: ConversationResponsePayload;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  messageRequestpayload!: MessageRequestPayload

  constructor(
    private messsageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  handleSelection(event: any) {
    this.message += event.char;
  }

  submitMessage($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    // clean white space
    const value = element.value.trim();
    if (value.length < 1) return;
    // clean input
    element.value = '';



    this.messsageService.sendMessage(
      this.conversation.participantUsername,
      this.messageRequestpayload
    )

    const shortenValue = value.substring(0, 25) + "...";
    this.conversation.latestMessageContent = shortenValue;

    // this.conversation.messages.push(
    //   { content: value, createdAt: '10:30', loggedUser: true }
    // )

    // const shortenValue = value.substring(0, 25) + "...";
    // this.conversation.latestMessageContent = shortenValue;

  }


}
