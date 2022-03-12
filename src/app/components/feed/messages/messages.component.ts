import { Component, OnInit } from '@angular/core';
import ConversationResponsePayload from 'src/app/models/response-dto/conversation-response.payload';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  selectedConversation!: ConversationResponsePayload;

  constructor() { }

  ngOnInit(): void {
  }

  onConseversationSelected($event: ConversationResponsePayload) {
    this.selectedConversation = $event;
  }


}
