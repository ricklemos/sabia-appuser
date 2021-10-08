import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingClassService } from '../../services/ranking-class.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RankingsClassRanking } from '../../models/rankings-models';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'rankings-class-page',
  templateUrl: './rankings-class-page.component.html',
  styleUrls: ['./rankings-class-page.component.scss']
})
export class RankingsClassPageComponent implements OnInit, OnDestroy {

  classRanking: RankingsClassRanking;
  unsubscribe = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private rankingClassService: RankingClassService,
    private router: Router,
    private urlService: UrlService,
  ) {
  }

  ngOnInit(): void {
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    const fetchClassRanking = this.rankingClassService.fetchClassRanking(classroomId).pipe(
      tap((data) => {
        data.ranking.sort(this.rankingClassService.compareRanking);
        this.classRanking = data;
        this.loading = false;
      })
    ).subscribe(noop);
    this.unsubscribe.push(fetchClassRanking);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  goBack(): void {
    this.router.navigate([this.urlService.getRankings()]);
  }
}
