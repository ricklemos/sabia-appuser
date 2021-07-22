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
    this.router.navigate([this.urlService.getHomeUrl()]);
  }

  continueQuestionary(): void {
    this.dialog.closeAll();
  }

}
