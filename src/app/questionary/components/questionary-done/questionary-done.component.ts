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
    this.questionaryName = this.questionaryService.getQuestionary().questionaryName;
    this.grade = Math.round((this.score / this.nQuestions) * 10).toFixed(1);
    // TODO: Este código abaixo, na verdade, deveria ser uma cloud function (podemos implementar na próxima sprint)
    // Atualizar módulo
    const module = this.moduleService.getModule();
    const nLessons = module.lessons.length;
    const lastPercentage = module.moduleProgressPercentage;
    const lessonsCompleted = lastPercentage * nLessons / 100 + 1;
    const newPercentage = lessonsCompleted / nLessons * 100;
    module.moduleProgressPercentage = newPercentage;
    module.lessons.map(lesson => {
      if (lesson.questionary === this.questionaryService.getQuestionary().questionaryId) {
        lesson.complete = true;
      }
    });
    this.moduleService.setModule(module);
    this.moduleService.updateModule()
      .then(() => console.log('Atualizou lição do módulo'))
      .catch((error) => console.log(error));
  }

  closeQuestionary(): void {
    this.router.navigate([this.urlService.getModule(this.moduleService.getModuleId())]);
  }

}
