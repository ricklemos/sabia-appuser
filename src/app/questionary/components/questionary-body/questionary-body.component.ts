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

  constructor(
    private questionaryDialogService: QuestionaryDialogService
  ) {
  }

  ngOnInit(): void {
  }

  selectAlternative(alternativeSelected: Alternative): void {
    this.alternativeSelected = alternativeSelected;
    const [correctAnswer] = this.question.alternatives.filter((alternative: Alternative) => alternative.isRight);
    if (this.question.explanationText){
      const data = {
        isRight: alternativeSelected.isRight,
        explanationText: this.question.explanationText
      };
      this.questionaryDialogService.openQuestionaryAnswer(data).subscribe(() => this.goToNextQuestion());
    } else {
      const data = {
        isRight: alternativeSelected.isRight,
        explanationText: correctAnswer.alternativeText
      };
      this.questionaryDialogService.openQuestionaryAnswer(data).subscribe(() => this.goToNextQuestion());
    }
  }

  goToNextQuestion(): void {
    // Esse evento dispara uma função no container para passar para a próxima pergunta (nextQuestion)
    this.answerEvent.emit(this.alternativeSelected);
  }

}
