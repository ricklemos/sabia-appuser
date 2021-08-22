import { Component, Input, OnInit } from '@angular/core';
import { RankingsUser } from '../../models/rankings-models';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';

@Component({
  selector: 'ranking-user-data',
  templateUrl: './ranking-user-data.component.html',
  styleUrls: ['./ranking-user-data.component.scss']
})
export class RankingUserDataComponent implements OnInit {
  @Input() user: RankingsUser;
  @Input() index: number;
  itsMe: boolean;

  constructor(
    private sessionsLoginService: SessionsLoginService
  ) { }

  ngOnInit(): void {
    this.itsMe = this.user.userId === this.sessionsLoginService.getUserId();
  }

}
