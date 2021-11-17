export interface InvestmentModule {
  moduleName: 'VARIABLE_INCOME' | 'FIXED_INCOME' | 'ANIMAL_GAME';
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
}

