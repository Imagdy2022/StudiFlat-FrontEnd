import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-general-info-user',
  templateUrl: './general-info-user.component.html',
  styleUrls: ['./general-info-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoUserComponent {
  @Input() titlePage: string = '';
  @Output() changeImageUrl: EventEmitter<string> = new EventEmitter<string>();
  @Input() imageUrl: string = '';
  @Input() loadingButton: boolean = false;

  constructor(private uploadFile: UploadFileService, private http: HttpClient) { }

  /**
   * to upload a file and conver as a link
   * @param event
   */
  uploadPic(event: any) {
    this.loadingButton = true;
    if (event != 'delete') {
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append('fileData', selectedFile, selectedFile.name);

      this.uploadFile.uploadSingleFile(formData).subscribe((img: any) => {
        this.imageUrl = img[0].file_Path;
        this.changeImageUrl.emit(img[0].file_Path);
        this.loadingButton = false;
      })
    } else if (event == 'delete') {
      this.imageUrl = '';
      this.changeImageUrl.emit(this.defaultImageUrl());
      this.loadingButton = false;
    }
  }

  /**
   * defaultImageUrl
   * @returns string
   */
  defaultImageUrl(): string {
    return 'https://t4.ftcdn.net/jpg/05/50/60/49/360_F_550604961_BZT4vo52ysIku2cQ3Zn8sAQg1rXHBKv0.jpg'
  }


}
