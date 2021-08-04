import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'questionary-answer',
  templateUrl: './questionary-answer.component.html',
  styleUrls: ['./questionary-answer.component.scss']
})
export class QuestionaryAnswerComponent implements OnInit {
  @Input() data: any;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialog.closeAll();
    this.bottomSheet.dismiss();
  }

}
