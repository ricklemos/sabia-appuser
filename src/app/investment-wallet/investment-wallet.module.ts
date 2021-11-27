import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutInvestmentWalletComponent } from './layout/layout-investment-wallet/layout-investment-wallet.component';
import { InvestmentWalletOverviewPageComponent } from './containers/investment-wallet-overview-page/investment-wallet-overview-page.component';
import { RouterModule } from '@angular/router';
import { InvestmentWalletRoutes } from './investment-wallet-routing';
import { NavigationModule } from '../navigation/navigation.module';
import { InvestmentWalletTradePageComponent } from './containers/investment-wallet-trade-page/investment-wallet-trade-page.component';
import { InvestmentWalletProductsPageComponent } from './containers/investment-wallet-products-page/investment-wallet-products-page.component';
import { InvestmentTopicComponent } from './components/investment-topic/investment-topic.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { CollactComponentsModule } from 'collact-components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreditAvailableComponent } from './components/credit-available/credit-available.component';
import { BuyAndSellComponent } from './components/buy-and-sell/buy-and-sell.component';
import { InvestmentWalletProductListComponent } from './components/investment-wallet-product-list/investment-wallet-product-list.component';
import { NumeralPipe } from './pipes/numeral.pipe';
import { InvestmentWalletProductVariableIncomeComponent } from './components/investment-wallet-product-variable-income/investment-wallet-product-variable-income.component';
import { InvestmentWalletProductFixedIncomeComponent } from './components/investment-wallet-product-fixed-income/investment-wallet-product-fixed-income.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InvestmentWalletPizzaComponent } from './components/investment-wallet-pizza/investment-wallet-pizza.component';
import { ChartsModule } from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '../forms/forms.module';

@NgModule({
  declarations: [
    LayoutInvestmentWalletComponent,
    InvestmentWalletOverviewPageComponent,
    InvestmentWalletTradePageComponent,
    InvestmentWalletProductsPageComponent,
    InvestmentTopicComponent,
    CreditAvailableComponent,
    BuyAndSellComponent,
    InvestmentWalletProductListComponent,
    NumeralPipe,
    InvestmentWalletProductVariableIncomeComponent,
    InvestmentWalletProductFixedIncomeComponent,
    InvestmentWalletPizzaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(InvestmentWalletRoutes),
    NavigationModule,
    CollactDesignSystemModule,
    CollactComponentsModule,
    FlexLayoutModule,
    ChartsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class InvestmentWalletModule {
}
