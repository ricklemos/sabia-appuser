import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { QuestionaryService } from '../../services/questionary.service';

@Component({
  selector: 'questionary-done',
  templateUrl: './questionary-done.component.html',
  styleUrls: ['./questionary-done.component.scss']
})
export class QuestionaryDoneComponent implements OnInit {

  @Input() score: number;
  @Input() nQuestions;
  grade: string;
  questionaryName: string;

  constructor(
    private router: Router,
    private urlService: UrlService,
    private questionaryService: QuestionaryService
  ) {
  }

  ngOnInit(): void {
    this.questionaryName = this.questionaryService.getQuestionary().questionaryName;
    this.grade = Math.round((this.score / this.nQuestions) * 10).toFixed(1);
  }

  closeQuestionary(): void {
    // TODO: go back to module progress
    this.router.navigate([this.urlService.getHomeUrl()]);
  }

}
