export interface InvestmentModule {
  moduleName: 'VARIABLE_INCOME' | 'FIXED_INCOME' | 'TREASURE' | 'BALANCE';
  invested: number;  // in cents
  variation: number; // between 0 and 1
  label: string;
  color: string;
  percentage: number;
}

export interface InvestmentProduct {
  id: string;
  label?: string;
  position?: number;
  module: InvestmentModule['moduleName'];
  unitPrice?: number;

  // Renda Fixa
  seller?: string;
  yield?: string; // Rendimento
  dueDate?: string; // Data
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

export interface InvestmentTreasure {
  dataBase: number;
  puBaseManha: number;
  puCompraManha: number;
  puVendaManha: number;
  tipoTitulo: string;
  txCompraManha: number;
  txVendaManha: number;
  vencimento: string;
  id: string;
}

export interface InvestmentProductList {
  type: InvestmentModule['moduleName'];
  stockList?: InvestmentStock[];
  treasureList?: InvestmentTreasure[];
}

export interface InvestmentWallet {
  userId: string;
  walletId: string;
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

export interface InvestmentWalletPizzaGraphProduct {
  name: string;
  balance: number;
  color: string;
  percentage: number;
}

