import { PostService } from 'src/app/services/post/post.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  // Progress bar above page
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

}
