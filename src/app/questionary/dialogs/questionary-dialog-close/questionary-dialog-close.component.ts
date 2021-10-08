import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { QuestionaryService } from '../../services/questionary.service';

@Component({
  selector: 'questionary-dialog-close',
  templateUrl: './questionary-dialog-close.component.html',
  styleUrls: ['./questionary-dialog-close.component.scss']
})
export class QuestionaryDialogCloseComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private urlService: UrlService,
    private questionnaireService: QuestionaryService
  ) {
  }

  ngOnInit(): void {
  }

  closeQuestionary(): void {
    this.dialog.closeAll();
    this.router.navigate([this.urlService.getModule(this.questionnaireService.getQuestionnaire().moduleId)]);
  }

  continueQuestionary(): void {
    this.dialog.closeAll();
  }

}
