export interface InvestmentModule {
  moduleName: 'VARIABLE_INCOME' | 'FIXED_INCOME' | 'TREASURE';
  invested: number;  // in cents
  variation: number; // between 0 and 1
  label: string;
  color: string;
  percentage: number;
}

export interface InvestmentProduct {
  id: string;
  label?: string;
  module: InvestmentModule['moduleName'];

  // Renda Fixa
  seller?: string;
  yield?: string; // Rendimento
  returnDate?: string; // Data
  minimumInvestment?: number;

  // Renda Variável
  variationDay?: number;
  variationMonth?: number;
  variationYear?: number;
  currentValue?: number;
  variableIncomeData?: InvestmentStock;
}

export interface InvestmentStock {
  ticker: string;
  companyName?: string;
  varDay?: number;
  varMonth?: number;
  varYear?: number;
  currentPrice?: number;
}

export interface InvestmentWallet {
  userId: string;
  balance: number;
  stocksEvents: StocksEvent[];
  publicFixesIncomeEvents: PublicFixedIncomeEvent[];
  privateFixedIncomeEvents: PrivateFixedIncomeEvent[];
}

export interface StocksEvent {
  type: 'BUY' | 'SELL';
  dateTime: Date;
  ticker: string;
  name: string;
  quotas: number;
  price: number;
}

export interface PublicFixedIncomeEvent {
  type: 'BUY' | 'SELL';
  dateTime: Date;
  id: string;
  quotas: number;
  productType: string;
  tax: number;
  unitPrice: number;
  due: string;
}

export interface PrivateFixedIncomeEvent {
  type: 'BUY' | 'SELL';
  dateTime: Date;
  bank: string;
  name: string;
  amount: number;
  productType: string;
  yield: string;
  liquidity: string;
  due: string;
}

export interface InvestmentWalletPizzaGraph {
  fixedIncome: number;
  variableIncome: number;
  treasure: number;
  balance: number;
}

