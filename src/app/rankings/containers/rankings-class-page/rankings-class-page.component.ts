import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingClassService } from '../../services/ranking-class.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ClassRanking } from '../../models/rankings-models';

@Component({
  selector: 'rankings-class-page',
  templateUrl: './rankings-class-page.component.html',
  styleUrls: ['./rankings-class-page.component.scss']
})
export class RankingsClassPageComponent implements OnInit, OnDestroy {

  classRanking: ClassRanking;
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
        this.classRanking = data;
        console.log(this.classRanking);
      })
    ).subscribe(noop);
    this.unsubscribe.push(fetchClassRanking);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

}
