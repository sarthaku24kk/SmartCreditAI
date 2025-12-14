import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import { UserFinancialProfile, AIAnalysisResult } from './types';
import { analyzeCreditRisk } from './services/geminiService';
import { Activity, Shield } from 'lucide-react';

function App() {
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserFinancialProfile) => {
    setLoading(true);
    setError(null);
    try {
      // Small delay to allow UI to update if instant (better UX)
      const analysis = await analyzeCreditRisk(data);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze data. Please ensure the API Key is set correctly and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Activity size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">SmartCredit <span className="text-blue-600">AI</span></h1>
                    <p className="text-xs text-gray-500 -mt-1">Fair & Transparent Lending</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <Shield size={14} />
                    <span>Secure & Private</span>
                </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {error && (
            <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!result ? (
            <div className="flex flex-col items-center">
                <div className="text-center mb-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why get rejected? <br/>
                        <span className="text-blue-600">Know your score before you apply.</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Our AI analyzes your profile like a bank, explains your risk in simple English/Hinglish, and gives you a plan to get approved.
                    </p>
                </div>
                <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
            </div>
        ) : (
            <Dashboard data={result} onReset={handleReset} />
        )}

      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} SmartCredit AI. Hackathon Demo.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;