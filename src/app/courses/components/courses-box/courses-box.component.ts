import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../../models/enrollment';

@Component({
  selector: 'courses-box',
  templateUrl: './courses-box.component.html',
  styleUrls: ['./courses-box.component.scss']
})
export class CoursesBoxComponent implements OnInit {
  @Input() enrollment: Enrollment;

  constructor() {
  }

  ngOnInit(): void {
  }

  seeMore(): void {
    //TODO: fazer botão direcionar para página de detalhes do curso
  }

}
