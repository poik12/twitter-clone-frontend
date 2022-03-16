import { Observable, Subject } from 'rxjs';
import { faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import ConversationResponsePayload from 'src/app/models/response-dto/conversation-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './messages-sidebar.component.html',
  styleUrls: ['./messages-sidebar.component.css']
})
export class MessagesSidebarComponent implements OnInit {

  headerIcon = faEnvelope;
  invitationsIcon = faAngleRight;

  conversationList: ConversationResponsePayload[] = [];
  @Output() conversationSelected: EventEmitter<ConversationResponsePayload> = new EventEmitter();
  conversationSelectedId: number = -1;

  loggedUser: string = this.authService.getUsernameFromLocalStorage();
  jpgFormat: string = 'data:image/jpeg;base64,';

  searchTextFromSearchBar!: string;

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherTweetPage: boolean = true;
  notScrollable: boolean = true;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  get filteredConversations() {
    return this.conversationList.filter((conversation) => {
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
    this.getConversationHistory(0);
  }

  searchedValue($event: any) {
    this.searchTextFromSearchBar = $event;
  }

  // Change color of selected conversation
  onSelectedConversation(index: number): void {
    this.conversationSelectedId = index;

  }

  // When scrolling posts activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherTweetPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextConversationPage();
    }
  }

  private loadNextConversationPage() {
    // add page and size
    this.getConversationHistory(this.currentPageNumber++);
  }

  private getConversationHistory(numberPage: number) {
    // conversation history for logged user
    this.messageService
      .getAllConversations(numberPage)
      .subscribe((conversationResponse) => {
        if (conversationResponse.length === 0) {
          this.notEmptyAnotherTweetPage = false;
          this.spinner.hide();
        }

        this.conversationList = [...this.conversationList, ...conversationResponse];
        this.notScrollable = true;
      });
  }

}
