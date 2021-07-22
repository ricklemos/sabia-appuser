import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'questionary-done',
  templateUrl: './questionary-done.component.html',
  styleUrls: ['./questionary-done.component.scss']
})
export class QuestionaryDoneComponent implements OnInit {

  @Input() score: number;
  @Input() nQuestions;

  constructor(
    private router: Router,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
  }

  closeQuestionary(): void {
    // TODO: go back to module progress
    this.router.navigate([this.urlService.getHomeUrl()]);
  }

}
