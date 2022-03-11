import { Component, OnInit } from '@angular/core';
import ConversationResponsePayload from 'src/app/models/conversation-response.payload';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // there should be conversatin resposne payload
  // selectedConversation!: ConversationResponsePayload;
  selectedConversation!: ConversationResponsePayload;

  constructor() { }

  ngOnInit(): void {
  }

  onConseversationSelected($event: ConversationResponsePayload) {
    this.selectedConversation = $event;
  }

  // onConseversationSelected($event: any) {
  //   this.selectedConversation = $event;
  // }

}
