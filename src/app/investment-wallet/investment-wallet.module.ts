import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutInvestmentWalletComponent } from './layout/layout-investment-wallet/layout-investment-wallet.component';
import { InvestmentWalletOverviewPageComponent } from './containers/investment-wallet-overview-page/investment-wallet-overview-page.component';
import { RouterModule } from '@angular/router';
import { InvestmentWalletRoutes } from './investment-wallet-routing';
import { NavigationModule } from '../navigation/navigation.module';


@NgModule({
  declarations: [
    LayoutInvestmentWalletComponent,
    InvestmentWalletOverviewPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(InvestmentWalletRoutes),
    NavigationModule
  ]
})
export class InvestmentWalletModule {
}
