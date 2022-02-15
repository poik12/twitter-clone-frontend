import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.css', '../../auth/auth.component.css']
})
export class UploadImageDialogComponent implements OnInit {

  twitterIcon = faTwitter;

  // Upload file
  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;
  imagePreviedUrl: any;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<File>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: File
  ) { }

  ngOnInit(): void {
  }

  closeUploadImageDialog() {
    this.dialogRef.close({ event: 'Cancel', data: null });
  }

  // Drop or Browse Image File
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {

      // If file is not empty
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        this.fileEntry.file(
          (file: File) => {

            // Here you can access the real file
            console.log(droppedFile.relativePath, file);

            // Enable button to submit
            this.fileUploaded = true;

            // Show image preview in dialog
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imagePreviedUrl = reader.result;
            };
          }
        );

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  // Submit uploaded image and send it to tweetbox
  uploadImage() {

    console.log("File entry: " + this.fileEntry);

    if (this.fileEntry !== undefined) {

      this.fileEntry.file(
        (file: File) => {
          console.log("FILE: " + file);
          this.dialogRef.close({ data: file });
        }
      );
    }
  }


}
