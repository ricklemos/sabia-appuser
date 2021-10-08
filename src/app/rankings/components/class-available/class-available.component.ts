import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { RankingsEnrollments } from '../../models/rankings-models';

@Component({
  selector: 'class-available',
  templateUrl: './class-available.component.html',
  styleUrls: ['./class-available.component.scss']
})
export class ClassAvailableComponent implements OnInit {
  @Input() enrollment: RankingsEnrollments;
  constructor(
    private router: Router,
    private urlService: UrlService
  ) {

  }

  ngOnInit(): void {
  }

  goToRanking(): void {
    const url = this.urlService.getClassroomRanking(this.enrollment.classroomId);
    this.router.navigate([url]);
  }
}
