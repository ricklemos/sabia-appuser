import { Component, Input, OnInit } from '@angular/core';
import { Attachment } from '../../models/module';

@Component({
  selector: 'attachment-box',
  templateUrl: './attachment-box.component.html',
  styleUrls: ['./attachment-box.component.scss']
})
export class AttachmentBoxComponent implements OnInit {

  @Input() attachment: Attachment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
