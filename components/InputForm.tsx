import React, { useState } from 'react';
import { UserFinancialProfile, EmploymentType } from '../types';
import { IndianRupee, Briefcase, CreditCard, Calendar, User, TrendingUp } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserFinancialProfile) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserFinancialProfile>({
    fullName: '',
    age: 25,
    employmentType: EmploymentType.Salaried,
    monthlyIncome: 30000,
    totalMonthlyEMIs: 0,
    totalOutstandingDebt: 0,
    creditScore: 700,
    creditHistoryYears: 2,
    missedPayments: 0,
    creditUtilization: 30,
    loanAmountRequested: 100000,
    loanTenureMonths: 12
  });

  const handleChange = (field: keyof UserFinancialProfile, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderLabel = (text: string, icon?: React.ReactNode) => (
    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
      {icon && <span className="text-blue-600">{icon}</span>}
      {text}
    </label>
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Check Your Eligibility</h2>
        <p className="opacity-90 text-sm mt-1">Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Financial Health' : 'Loan Requirements'}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-blue-800 h-1.5 mt-4 rounded-full overflow-hidden">
          <div className="bg-white h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              {renderLabel("Full Name", <User size={16} />)}
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                  {renderLabel("Age")}
                  <input
                    type="number"
                    min={18}
                    max={80}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.age}
                    onChange={(e) => handleChange('age', parseInt(e.target.value))}
                  />
                </div>
                <div>
                    {renderLabel("Employment Type", <Briefcase size={16} />)}
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        value={formData.employmentType}
                        onChange={(e) => handleChange('employmentType', e.target.value as EmploymentType)}
                    >
                        {Object.values(EmploymentType).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
                {renderLabel("Monthly Income (₹)", <IndianRupee size={16} />)}
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min={10000}
                        max={500000}
                        step={5000}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleChange('monthlyIncome', parseInt(e.target.value))}
                    />
                    <input
                        type="number"
                        className="w-28 p-2 border border-gray-300 rounded text-right"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleChange('monthlyIncome', parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    {renderLabel("Current Monthly EMIs (₹)")}
                    <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.totalMonthlyEMIs}
                        onChange={(e) => handleChange('totalMonthlyEMIs', parseInt(e.target.value))}
                    />
                </div>
                 <div>
                    {renderLabel("Total Outstanding Debt (₹)")}
                    <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.totalOutstandingDebt}
                        onChange={(e) => handleChange('totalOutstandingDebt', parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <CreditCard size={16} /> Credit Report Simulation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-xs text-gray-500">Simulated CIBIL Score</label>
                        <input
                            type="number"
                            min={300}
                            max={900}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            value={formData.creditScore}
                            onChange={(e) => handleChange('creditScore', parseInt(e.target.value))}
                        />
                    </div>
                     <div>
                        <label className="text-xs text-gray-500">Utilization (%)</label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            value={formData.creditUtilization}
                            onChange={(e) => handleChange('creditUtilization', parseInt(e.target.value))}
                        />
                    </div>
                     <div>
                        <label className="text-xs text-gray-500">History (Years)</label>
                        <input
                            type="number"
                            min={0}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            value={formData.creditHistoryYears}
                            onChange={(e) => handleChange('creditHistoryYears', parseFloat(e.target.value))}
                        />
                    </div>
                     <div>
                        <label className="text-xs text-gray-500">Missed Pay (12m)</label>
                        <input
                            type="number"
                            min={0}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            value={formData.missedPayments}
                            onChange={(e) => handleChange('missedPayments', parseInt(e.target.value))}
                        />
                    </div>
                </div>
            </div>
          </div>
        )}

        {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
                 <div>
                    {renderLabel("Loan Amount Requested (₹)", <TrendingUp size={16} />)}
                    <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xl font-semibold text-blue-900"
                        value={formData.loanAmountRequested}
                        onChange={(e) => handleChange('loanAmountRequested', parseInt(e.target.value))}
                    />
                </div>

                 <div>
                    {renderLabel("Tenure (Months)", <Calendar size={16} />)}
                    <div className="flex gap-2">
                        {[12, 24, 36, 48, 60].map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => handleChange('loanTenureMonths', m)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                    formData.loanTenureMonths === m 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {m}M
                            </button>
                        ))}
                    </div>
                    <input 
                        type="range"
                        min="6"
                        max="84"
                        value={formData.loanTenureMonths}
                        onChange={(e) => handleChange('loanTenureMonths', parseInt(e.target.value))}
                        className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">{formData.loanTenureMonths} months</div>
                </div>
            </div>
        )}

        <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            {step > 1 ? (
                 <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition"
                    disabled={isLoading}
                 >
                    Back
                 </button>
            ) : <div></div>}

            {step < 3 ? (
                 <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
                 >
                    Next
                 </button>
            ) : (
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-lg shadow-green-200 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                        </>
                    ) : 'Check Eligibility'}
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default InputForm;