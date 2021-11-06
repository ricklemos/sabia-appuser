import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutInvestmentWalletComponent } from './layout/layout-investment-wallet/layout-investment-wallet.component';
import { InvestmentWalletOverviewPageComponent } from './containers/investment-wallet-overview-page/investment-wallet-overview-page.component';
import { RouterModule } from '@angular/router';
import { InvestmentWalletRoutes } from './investment-wallet-routing';
import { NavigationModule } from '../navigation/navigation.module';
import { InvestmentWalletTradePageComponent } from './containers/investment-wallet-trade-page/investment-wallet-trade-page.component';
import { InvestmentWalletProductsPageComponent } from './containers/investment-wallet-products-page/investment-wallet-products-page.component';
import { NumeralPipe } from './pipes/numeral.pipe';


@NgModule({
  declarations: [
    LayoutInvestmentWalletComponent,
    InvestmentWalletOverviewPageComponent,
    InvestmentWalletTradePageComponent,
    InvestmentWalletProductsPageComponent,
    NumeralPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(InvestmentWalletRoutes),
    NavigationModule,
  ]
})
export class InvestmentWalletModule {
}
