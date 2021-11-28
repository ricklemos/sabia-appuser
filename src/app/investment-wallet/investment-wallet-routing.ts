import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { InvestmentWalletOverviewPageComponent } from './containers/investment-wallet-overview-page/investment-wallet-overview-page.component';
import { InvestmentWalletProductsPageComponent } from './containers/investment-wallet-products-page/investment-wallet-products-page.component';
import { InvestmentWalletTradePageComponent } from './containers/investment-wallet-trade-page/investment-wallet-trade-page.component';

export const InvestmentWalletRoutes: Routes = [
  {
    path: 'carteira',
    children: [
      {
        path: '',
        component: InvestmentWalletOverviewPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'produtos/:moduleSlug',
        component: InvestmentWalletProductsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'produtos/:moduleSlug/comprar-e-vender/:productId',
        component: InvestmentWalletTradePageComponent,
        canActivate: [AuthGuard],
      }
    ],
  }
];
