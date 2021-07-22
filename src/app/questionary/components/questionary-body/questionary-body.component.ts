import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Alternative, Question } from '../../models/questionary-models';
import { QuestionaryDialogService } from '../../services/questionary-dialog.service';

@Component({
  selector: 'questionary-body',
  templateUrl: './questionary-body.component.html',
  styleUrls: ['./questionary-body.component.scss']
})
export class QuestionaryBodyComponent implements OnInit {

  @Input() question: Question;
  @Output() answerEvent = new EventEmitter<Alternative>();
  alternativeSelected: Alternative;
  showBottomSheet: boolean;

  constructor(
    private questionaryDialogService: QuestionaryDialogService
  ) {
  }

  ngOnInit(): void {
    this.showBottomSheet = false;
    console.log(this.question.explanationText);
  }

  selectAlternative(alternative: Alternative): void {
    this.alternativeSelected = alternative;
    this.showBottomSheet = true;
    const data = {
      isRight: alternative.isRight,
      explanationText: this.question.explanationText
    };
    this.questionaryDialogService.openQuestionaryAnswer(data).subscribe(() => this.goToNextQuestion());
    console.log('mostrar bottom sheet');
  }

  goToNextQuestion(): void {
    this.showBottomSheet = false;
    // Esse evento dispara uma função no container para passar para a próxima pergunta (nextQuestion)
    this.answerEvent.emit(this.alternativeSelected);
  }

}
