import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-full-size-image-dialog',
  templateUrl: './full-size-image-dialog.component.html',
  styleUrls: ['./full-size-image-dialog.component.css']
})
export class FullSizeImageDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
