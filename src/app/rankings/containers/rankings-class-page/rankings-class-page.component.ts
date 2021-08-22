import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingClassService } from '../../services/ranking-class.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RankingsClassRanking } from '../../models/rankings-models';

@Component({
  selector: 'rankings-class-page',
  templateUrl: './rankings-class-page.component.html',
  styleUrls: ['./rankings-class-page.component.scss']
})
export class RankingsClassPageComponent implements OnInit, OnDestroy {

  classRanking: RankingsClassRanking;
  unsubscribe = [];

  constructor(
    private route: ActivatedRoute,
    private rankingClassService: RankingClassService
  ) {
  }

  ngOnInit(): void {
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    const fetchClassRanking = this.rankingClassService.fetchClassRanking(classroomId).pipe(
      tap((data) => {
        data.ranking.sort(this.rankingClassService.compareRanking);
        this.classRanking = data;
      })
    ).subscribe(noop);
    this.unsubscribe.push(fetchClassRanking);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

}
