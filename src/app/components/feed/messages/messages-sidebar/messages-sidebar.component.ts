import { Observable } from 'rxjs';
import { faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import ConversationResponsePayload from 'src/app/models/response-dto/conversation-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './messages-sidebar.component.html',
  styleUrls: ['./messages-sidebar.component.css']
})
export class MessagesSidebarComponent implements OnInit {

  headerIcon = faEnvelope;
  invitationsIcon = faAngleRight;

  conversations!: Array<ConversationResponsePayload>;
  @Output() conversationSelected: EventEmitter<ConversationResponsePayload> = new EventEmitter();

  loggedUser: string = this.authService.getUsernameFromLocalStorage();
  jpgFormat: string = 'data:image/jpeg;base64,';

  searchTextFromSearchBar!: string;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) { }

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

  ngOnInit(): void {
    this.getConversationHistory();
  }

  searchedValue($event: any) {
    this.searchTextFromSearchBar = $event;
  }

  getConversationHistory() {
    // conversatio history for logged user
    this.messageService
      .getAllConversations()
      .subscribe((data) => this.conversations = data);
  }
}
