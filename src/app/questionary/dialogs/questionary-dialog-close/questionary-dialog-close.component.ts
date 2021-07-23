import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'questionary-dialog-close',
  templateUrl: './questionary-dialog-close.component.html',
  styleUrls: ['./questionary-dialog-close.component.scss']
})
export class QuestionaryDialogCloseComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
  }

  closeQuestionary(): void {
    this.dialog.closeAll();
    // TODO: Fetch moduleId for correct navigation
    this.router.navigate([this.urlService.getModule('0001')]);
  }

  continueQuestionary(): void {
    this.dialog.closeAll();
  }

}
