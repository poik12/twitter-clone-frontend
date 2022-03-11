import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchIcon = faSearch;

  @Input() searchText!: string
  @Output() searchTextEmit = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  search() {
    this.searchTextEmit.emit(this.searchText);
  }


}
