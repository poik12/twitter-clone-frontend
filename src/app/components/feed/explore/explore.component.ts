import { Component, OnInit } from '@angular/core';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css', '../main.component.css']
})
export class ExploreComponent implements OnInit {

  searchIcon = faSearch;
  settingsIcon = faCog;

  constructor() { }

  ngOnInit(): void {
  }

}
