import {Component, Input, OnInit} from '@angular/core';
import {InvestmentModule, InvestmentPrivateFixedIncome} from '../../model/investment-wallet.model';
import {ActivatedRoute} from '@angular/router';
import {InvestmentWalletHelperService} from '../../services/investment-wallet-helper.service';
import {UrlService} from '../../../services/url.service';
import {PrivateFixedIncomeService} from '../../../services/private-fixed-income.service';

@Component({
  selector: 'investment-wallet-private-fixed-income-list',
  templateUrl: './investment-wallet-private-fixed-income-list.component.html',
  styleUrls: ['./investment-wallet-private-fixed-income-list.component.scss']
})
export class InvestmentWalletPrivateFixedIncomeListComponent implements OnInit {

  @Input() privateFixedIncomeList: InvestmentPrivateFixedIncome[] = [];
  filteredList: InvestmentPrivateFixedIncome[] = [];
  showList: InvestmentPrivateFixedIncome[] = [];
  moduleId: InvestmentModule['moduleName'];
  productsShowing = 10;

  constructor(
    private route: ActivatedRoute,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private urlService: UrlService,
    private privateFixedIncomeService: PrivateFixedIncomeService
  ) { }

  ngOnInit(): void {
    this.showList = this.privateFixedIncomeList.slice(0, this.productsShowing);
    this.filteredList = this.privateFixedIncomeList;
  }

  getChanges($event: any): void {
    if ($event === ''){
      this.filteredList = this.privateFixedIncomeList;
      this.showList = this.privateFixedIncomeList.slice(0, this.productsShowing);
      this.productsShowing = 10;
      return;
    }
    const textToSearch = $event.toUpperCase();
    this.filteredList = this.privateFixedIncomeList.filter(
      title => (
        title.bank.toUpperCase().includes(textToSearch)
        || title.name.toUpperCase().includes(textToSearch)
        || title.productType.toUpperCase().includes(textToSearch)
      )
    );
    this.showList = this.filteredList.slice(0, this.productsShowing);
  }
  getProductUrl(product: InvestmentPrivateFixedIncome): string {
    this.moduleId = this.investmentWalletHelperService.getModuleIdFromSlug(this.route.snapshot.paramMap.get('moduleSlug'));
    // const productId = product.name.replace(' ', '_');
    // console.log(productId);
    this.privateFixedIncomeService.setProduct(product);
    return this.urlService.getInvestmentWalletProductDetails(this.route.snapshot.paramMap.get('moduleSlug'), 'produto-de-banco');
  }

  loadMore(): void {
    this.productsShowing += 10;
    this.showList = this.filteredList.slice(0, this.productsShowing);
  }
}
