import {Component, Input, OnInit} from '@angular/core';
import {InvestmentModule, InvestmentTreasure} from '../../model/investment-wallet.model';
import {ActivatedRoute} from '@angular/router';
import {InvestmentWalletHelperService} from '../../services/investment-wallet-helper.service';
import {UrlService} from '../../../services/url.service';

@Component({
  selector: 'investment-wallet-treasure-list',
  templateUrl: './investment-wallet-treasure-list.component.html',
  styleUrls: ['./investment-wallet-treasure-list.component.scss']
})
export class InvestmentWalletTreasureListComponent implements OnInit {
  @Input() treasureList: InvestmentTreasure[] = [];
  moduleId: InvestmentModule['moduleName'];

  constructor(
    private route: ActivatedRoute,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
  }

  getChanges($event: any): void {
    console.log($event);
  }
  getTitleUrl(title: InvestmentTreasure): string {
    this.moduleId = this.investmentWalletHelperService.getModuleIdFromSlug(this.route.snapshot.paramMap.get('moduleSlug'));
    return this.urlService.getInvestmentWalletProductDetails(this.route.snapshot.paramMap.get('moduleSlug'), title.id);
  }
}
