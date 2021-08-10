import { Component, OnInit } from '@angular/core';
import { RankingClassService } from '../../services/ranking-class.service';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rankings-page',
  templateUrl: './rankings-page.component.html',
  styleUrls: ['./rankings-page.component.scss']
})
export class RankingsPageComponent implements OnInit {

  constructor(
    private rankingService: RankingClassService
  ) { }

  ngOnInit(): void {
    console.log('entrou na página');
    this.rankingService.fetchAvailableClasses('82JoYs8CBcY2JCsa5PLTgMwxr2E2').pipe(
      tap(data => console.log(data))
    ).subscribe(noop);
  }

}
