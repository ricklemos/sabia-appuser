import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionary-question-page',
  templateUrl: './questionary-question-page.component.html',
  styleUrls: ['./questionary-question-page.component.scss']
})
export class QuestionaryQuestionPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
    const questionaryId = this.route.snapshot.paramMap.get('questionaryId');
    console.log(questionaryId);
  }

  ngOnInit(): void {
  }

}
