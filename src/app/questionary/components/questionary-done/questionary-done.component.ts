import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { QuestionaryService } from '../../services/questionary.service';
import { ModuleService } from '../../../module/services/module.service';

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
    private questionaryService: QuestionaryService,
    private moduleService: ModuleService
  ) {
  }

  ngOnInit(): void {
    this.questionaryName = this.questionaryService.getQuestionnaire().questionnaireName;
    this.grade = (Math.round(this.score / this.nQuestions * 100) / 10).toFixed(1);
    const module = this.moduleService.getModule();
    module.lessons.map(lesson => {
      if (lesson.questionnaireId === this.questionaryService.getQuestionnaire().questionnaireId) {
        lesson.complete = true;
      }
    });
    this.moduleService.setModule(module);
    this.moduleService.updateModule()
      .then()
      .catch((error) => console.log(error));
  }

  closeQuestionary(): void {
    this.router.navigate([this.urlService.getModule(this.moduleService.getModuleId())]);
  }

}
