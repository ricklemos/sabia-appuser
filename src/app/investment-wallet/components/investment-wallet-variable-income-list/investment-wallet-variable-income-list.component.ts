import {Component, Input, OnInit} from '@angular/core';
import {
  InvestmentModule,
  InvestmentStock,
} from '../../model/investment-wallet.model';
import {UrlService} from '../../../services/url.service';
import {StocksService} from '../../../services/stocks.service';
import {InvestmentWalletHelperService} from '../../services/investment-wallet-helper.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'investment-wallet-variable-income-list',
  templateUrl: './investment-wallet-variable-income-list.component.html',
  styleUrls: ['./investment-wallet-variable-income-list.component.scss']
})
export class InvestmentWalletVariableIncomeListComponent implements OnInit {
  @Input() stockList: InvestmentStock[];
  filteredList: InvestmentStock[] = [];
  moduleId: InvestmentModule['moduleName'];

  constructor(
    private urlService: UrlService,
    private stocksService: StocksService,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.filteredList = this.stockList;
  }

  getStockUrl(stock: InvestmentStock): string {
    this.moduleId = this.investmentWalletHelperService.getModuleIdFromSlug(this.route.snapshot.paramMap.get('moduleSlug'));
    return this.urlService.getInvestmentWalletProductDetails(this.route.snapshot.paramMap.get('moduleSlug'), stock.ticker);
  }

  getChanges($event: string): void {
    if ($event === ''){
      this.filteredList = this.stockList;
      return;
    }
    const textToSearch = $event.toUpperCase();
    this.filteredList = this.stockList.filter(
      stock => stock.ticker.includes(textToSearch) || stock.companyName.toUpperCase().includes(textToSearch)
    );
  }
}
