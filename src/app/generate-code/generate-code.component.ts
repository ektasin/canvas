import { Component, OnInit } from '@angular/core';
 import * as JSZip from 'jszip';
 import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent implements OnInit {
  
  title;
  uploadFolder;

  handleFileInput(files) {
    this.uploadFolder = files;
  }

   

  constructor() { }

  ngOnInit(): void {
  }
  download() {
    var zip = new JSZip();
    zip.file("Title.txt", this.title);
    var imgFolder = zip.folder("");
    for (let i = 0; i < this.uploadFolder?.length; i++) {
      imgFolder.file(this.uploadFolder[i].name, this.uploadFolder[i], { base64: true });
    }
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        FileSaver.saveAs(content, "Category.zip");
      });
  }
}
