import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'questionary-dialog-answer',
  template: '<questionary-answer [data]="data"></questionary-answer>'
})
export class QuestionaryDialogAnswerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
