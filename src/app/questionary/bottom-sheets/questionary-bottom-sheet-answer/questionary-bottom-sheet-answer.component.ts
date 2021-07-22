import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'questionary-bottom-sheet-answer',
  template: '<questionary-answer [data]="data"></questionary-answer>'
})
export class QuestionaryBottomSheetAnswerComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
