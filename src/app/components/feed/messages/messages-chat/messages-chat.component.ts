import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFileImage, faImage, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';

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

  @Input() conversation: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }



  handleSelection(event: any) {
    this.message += event.char;
  }

  submitMessage($event: Event) {
    // let value = $event.target.value.trim();
    // this.message = '';
    // if (value.length < 1) return false;
    // this.conversation.latestMessage = value;
    // this.conversation.messages.unshift({
    //   id: 1,
    //   body: value,
    //   time: '10:21',
    //   me: true,
    // });
  }


}
