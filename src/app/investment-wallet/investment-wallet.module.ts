import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutInvestmentWalletComponent } from './layout/layout-investment-wallet/layout-investment-wallet.component';
import { InvestmentWalletOverviewPageComponent } from './containers/investment-wallet-overview-page/investment-wallet-overview-page.component';
import { RouterModule } from '@angular/router';
import { InvestmentWalletRoutes } from './investment-wallet-routing';
import { NavigationModule } from '../navigation/navigation.module';
import { InvestmentWalletTradePageComponent } from './containers/investment-wallet-trade-page/investment-wallet-trade-page.component';
import { InvestmentWalletProductsPageComponent } from './containers/investment-wallet-products-page/investment-wallet-products-page.component';
import { InvestmentWalletInvestmentModuleComponent } from './components/investment-wallet-investment-module/investment-wallet-investment-module.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { CollactComponentsModule } from 'collact-components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InvestmentWalletCreditAvailableComponent } from './components/investment-wallet-credit-available/investment-wallet-credit-available.component';
import { InvestmentWalletBuyAndSellComponent } from './components/investment-wallet-buy-and-sell/investment-wallet-buy-and-sell.component';
import { NumeralPipe } from './pipes/numeral.pipe';
import { InvestmentWalletProductVariableIncomeComponent } from './components/investment-wallet-product-variable-income/investment-wallet-product-variable-income.component';
import { InvestmentWalletProductFixedIncomeComponent } from './components/investment-wallet-product-fixed-income/investment-wallet-product-fixed-income.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvestmentWalletPizzaComponent } from './components/investment-wallet-pizza/investment-wallet-pizza.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';
import { InvestmentWalletMyproductsCardComponent } from './components/investment-wallet-myproducts-card/investment-wallet-myproducts-card.component';
import { InvestmentWalletVariableIncomeListComponent } from './components/investment-wallet-variable-income-list/investment-wallet-variable-income-list.component';
import { InvestmentWalletTreasureListComponent } from './components/investment-wallet-treasure-list/investment-wallet-treasure-list.component';
import { InvestmentWalletPrivateFixedIncomeListComponent } from './components/investment-wallet-private-fixed-income-list/investment-wallet-private-fixed-income-list.component';
import { InvestmentWalletProductPrivateFixedIncomeComponent } from './components/investment-wallet-product-private-fixed-income/investment-wallet-product-private-fixed-income.component';
import { InvestmentWalletBalanceCardComponent } from './components/investment-wallet-balance-card/investment-wallet-balance-card.component';
import { InvestmentWalletSeriesGraphComponent } from './components/investment-wallet-series-graph/investment-wallet-series-graph.component';

@NgModule({
  declarations: [
    LayoutInvestmentWalletComponent,
    InvestmentWalletOverviewPageComponent,
    InvestmentWalletTradePageComponent,
    InvestmentWalletProductsPageComponent,
    InvestmentWalletInvestmentModuleComponent,
    InvestmentWalletCreditAvailableComponent,
    InvestmentWalletBuyAndSellComponent,
    NumeralPipe,
    InvestmentWalletProductVariableIncomeComponent,
    InvestmentWalletProductFixedIncomeComponent,
    InvestmentWalletPizzaComponent,
    InvestmentWalletMyproductsCardComponent,
    InvestmentWalletVariableIncomeListComponent,
    InvestmentWalletTreasureListComponent,
    InvestmentWalletPrivateFixedIncomeListComponent,
    InvestmentWalletProductPrivateFixedIncomeComponent,
    InvestmentWalletBalanceCardComponent,
    InvestmentWalletSeriesGraphComponent,
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
