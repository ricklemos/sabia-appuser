import { Component, OnInit } from '@angular/core';
import { RankingClassService } from '../../services/ranking-class.service';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RankingsEnrollments } from '../../models/rankings-models';

@Component({
  selector: 'rankings-page',
  templateUrl: './rankings-page.component.html',
  styleUrls: ['./rankings-page.component.scss']
})
export class RankingsPageComponent implements OnInit {
  enrollments: RankingsEnrollments[];
  constructor(
    private rankingService: RankingClassService
  ) {
  }

  ngOnInit(): void {
    this.rankingService.fetchAvailableClasses().pipe(
      tap(data => this.enrollments = data)
    ).subscribe(noop);
  }

}
