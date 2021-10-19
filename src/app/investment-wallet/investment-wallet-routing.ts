import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { InvestmentWalletOverviewPageComponent } from './containers/investment-wallet-overview-page/investment-wallet-overview-page.component';

export const InvestmentWalletRoutes: Routes = [
  {
    path: 'carteira',
    children: [
      {
        path: '',
        component: InvestmentWalletOverviewPageComponent,
        canActivate: [AuthGuard],
      }
    ],
  }
];
