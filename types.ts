export enum EmploymentType {
  Salaried = 'Salaried',
  SelfEmployed = 'Self-Employed',
  Business = 'Business Owner',
  Student = 'Student',
  Other = 'Other'
}

export interface UserFinancialProfile {
  fullName: string;
  age: number;
  monthlyIncome: number;
  totalMonthlyEMIs: number;
  totalOutstandingDebt: number;
  employmentType: EmploymentType;
  creditScore: number; // Simulated CIBIL
  creditHistoryYears: number;
  missedPayments: number; // Last 12 months
  creditUtilization: number; // Percentage 0-100
  loanAmountRequested: number;
  loanTenureMonths: number;
}

export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface ImprovementStep {
  action: string;
  impact: string;
  timeline: string;
}

export interface AIAnalysisResult {
  eligibilityScore: number; // 0-100
  riskLevel: RiskLevel;
  approvalLikelihood: 'Likely Approved' | 'Likely Rejected' | 'Review Required';
  explanation: string; // Simple English/Hinglish
  keyFactors: {
    factor: string;
    impact: 'Positive' | 'Negative';
    description: string;
  }[];
  improvementPlan: ImprovementStep[];
  estimatedImprovementTime: string;
}