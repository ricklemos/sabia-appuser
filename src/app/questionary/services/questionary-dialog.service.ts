import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionaryDialogAnswerComponent } from '../dialogs/questionary-dialog-answer/questionary-dialog-answer.component';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { QuestionaryBottomSheetAnswerComponent } from '../bottom-sheets/questionary-bottom-sheet-answer/questionary-bottom-sheet-answer.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryDialogService {

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
  }

  openQuestionaryAnswer(data): Observable<any> {
    if (window.innerWidth <= 600) {
      const bottomSheetRef = this.bottomSheet.open(QuestionaryBottomSheetAnswerComponent, {
        closeOnNavigation: true,
        data
      });
      return bottomSheetRef.afterDismissed();
    } else {
      const dialogRef = this.dialog.open(QuestionaryDialogAnswerComponent, {
        width: '512px',
        data
      });
      return dialogRef.afterClosed();
    }


  }

}
