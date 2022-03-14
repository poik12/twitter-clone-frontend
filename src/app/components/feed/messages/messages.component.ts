import MessageResponsePayload from 'src/app/models/response-dto/message-response.payload';
import { Component, OnInit } from '@angular/core';
import ConversationResponsePayload from 'src/app/models/response-dto/conversation-response.payload';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  selectedConversation!: ConversationResponsePayload;
  messageList: MessageResponsePayload[] = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  onConseversationSelected($event: ConversationResponsePayload) {
    this.selectedConversation = $event;
    this.messageService
      .getMessagesForConversationById(this.selectedConversation.id, 0)
      .subscribe((messageResponse) => this.messageList = messageResponse)
  }

}
