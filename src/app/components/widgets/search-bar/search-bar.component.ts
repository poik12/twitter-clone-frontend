import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { debounceTime, distinctUntilChanged, filter, map, retry, startWith, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchIcon = faSearch;

  @Input() searchText!: string
  @Output() searchTextEmit = new EventEmitter<string>();

  results: TweetResponsePayload[] = [];

  // private searchedTweets = new BehaviorSubject<TweetResponsePayload[]>(this.results);
  // @Output() searchedTweets: EventEmitter<TweetResponsePayload[]> = new EventEmitter();


  // @Output() searchedTweets: EventEmitter<TweetResponsePayload[]> = new EventEmitter();
  // onSearch: FormControl = new FormControl('');

  constructor(
    private tweetService: TweetService
  ) {

    // this.results = this.onSearch.valueChanges.pipe(
    //   map((search) => search.trim()),
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   filter((search) => search !== ""),
    //   switchMap((search) => this.tweetService.findTweetBySearchTerm(search).pipe(
    //     retry(3),
    //     startWith([])
    //   ))
    // );


  }

  ngOnInit(): void {

    console.log(this.results);
  }

  search() {
    this.searchTextEmit.emit(this.searchText);
  }

  doSearch(searchTerm: any): void {
    searchTerm = searchTerm.target.value
    console.log(searchTerm)
    this.results = [];
    this.tweetService
      .findTweetBySearchTerm(searchTerm, 10)
      .subscribe((results) => this.results = results)
    console.log(this.results)
    this.tweetService.sendSearchedTweets(this.results);
  }


}
