import { Observable } from 'rxjs';
import { faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import ConversationResponsePayload from 'src/app/models/conversation-response.payload';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './messages-sidebar.component.html',
  styleUrls: ['./messages-sidebar.component.css']
})
export class MessagesSidebarComponent implements OnInit {

  headerIcon = faEnvelope;
  invitationsIcon = faAngleRight;

  conversations!: Array<ConversationResponsePayload>;
  // @Output() conversationSelected: EventEmitter<any> = new EventEmitter();
  @Output() conversationSelected: EventEmitter<ConversationResponsePayload> = new EventEmitter();

  searchTextFromSearchBar!: string;

  // conversations = [
  //   {
  //     id: 1,
  //     name: 'David',
  //     username: 'david',
  //     latestMessageTime: '8:21',
  //     latestMessageContent: 'latest message from David',
  //     latestMessageRead: false,
  //     messages: [
  //       { id: 1, content: 'Message from David MesMessage from David MeMessage from David MeMessage from David Me', time: '8:21', loggedUser: true },
  //       { id: 2, content: 'How are you?', time: '8:21', loggedUser: false },
  //       { id: 3, content: 'I am fine thanks', time: '8:21', loggedUser: true },
  //       { id: 4, content: 'Glad to hear that', time: '8:21', loggedUser: false },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'James',
  //     username: 'james',
  //     latestMessageTime: '8:21',
  //     latestMessageContent: 'latest message from James',
  //     latestMessageRead: true,
  //     messages: [
  //       { id: 1, content: 'Message from James', time: '8:21', loggedUser: true },
  //       { id: 2, content: 'How are you?', time: '8:21', loggedUser: false },
  //       { id: 3, content: 'I am fine thanks', time: '8:21', loggedUser: true },
  //       { id: 4, content: 'Glad to hear that', time: '8:21', loggedUser: false },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: 'Robin',
  //     username: 'robin',
  //     latestMessageTime: '8:21',
  //     latestMessageContent: 'latest message from Robin',
  //     latestMessageRead: true,
  //     messages: [
  //       { id: 1, content: 'Mesage from Robin', time: '8:21', loggedUser: true },
  //       { id: 2, content: 'How are you?', time: '8:21', loggedUser: false },
  //       { id: 3, content: 'I am fine thanks', time: '8:21', loggedUser: true },
  //       { id: 4, content: 'Glad to hear that', time: '8:21', loggedUser: false },
  //     ],
  //   },
  // ]


  get filteredConversations() {
    return this.conversations.filter((conversation) => {
      return (
        conversation.participantName
          .toLowerCase()
          .includes(this.searchTextFromSearchBar.toLowerCase()) ||
        conversation.latestMessageContent
          .toLowerCase()
          .includes(this.searchTextFromSearchBar.toLowerCase())
      );
    });
  }

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getConversationHistory();
  }

  searchedValue($event: any) {
    this.searchTextFromSearchBar = $event;
  }



  // getConversationHistory(): Observable<Array<ConversationResponsePayload>> {
  //   // for logged user
  //   this.messageService.getConversationHistory();
  // }

  getConversationHistory() {
    // for logged user
    this.messageService
      .getAllConversations()
      .subscribe(data => this.conversations = data);
  }
}
