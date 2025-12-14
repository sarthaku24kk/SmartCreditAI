import React from 'react';
import { AIAnalysisResult, RiskLevel } from '../types';
import GaugeChart from './GaugeChart';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

interface DashboardProps {
  data: AIAnalysisResult;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  const isApproved = data.approvalLikelihood === 'Likely Approved';
  
  const getRiskColor = (level: RiskLevel) => {
    switch(level) {
      case RiskLevel.Low: return 'text-green-600 bg-green-50 border-green-200';
      case RiskLevel.Medium: return 'text-amber-600 bg-amber-50 border-amber-200';
      case RiskLevel.High: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Badge */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
           <p className="text-gray-500">Based on your provided financial profile</p>
        </div>
        <button onClick={onReset} className="text-blue-600 font-medium hover:underline">
            Check Another Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Score Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 md:col-span-1 flex flex-col justify-between">
            <h3 className="font-semibold text-gray-700 mb-4">Loan Eligibility</h3>
            <GaugeChart score={data.eligibilityScore} />
            
            <div className={`mt-6 p-4 rounded-xl border ${getRiskColor(data.riskLevel)} flex items-center justify-between`}>
                <div>
                    <span className="text-xs uppercase tracking-wide font-bold opacity-80">Risk Level</span>
                    <div className="font-bold text-lg">{data.riskLevel} Risk</div>
                </div>
                {data.riskLevel === RiskLevel.Low ? <ShieldCheck size={28} /> : <AlertTriangle size={28} />}
            </div>

            <div className={`mt-3 py-2 px-4 rounded-lg text-center font-bold ${isApproved ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'}`}>
                {data.approvalLikelihood}
            </div>
        </div>

        {/* Explanation & Key Factors */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 md:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600"/> Why is my score {data.eligibilityScore}%?
            </h3>
            
            <div className="bg-blue-50 p-4 rounded-xl text-blue-900 leading-relaxed mb-6">
                "{data.explanation}"
            </div>

            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Key Factors</h4>
            <div className="space-y-3">
                {data.keyFactors.map((factor, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
                        <div className="mt-1">
                            {factor.impact === 'Positive' 
                                ? <CheckCircle size={20} className="text-green-500" /> 
                                : <XCircle size={20} className="text-red-500" />
                            }
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800">{factor.factor}</div>
                            <div className="text-sm text-gray-600">{factor.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Improvement Roadmap */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <TrendingUp size={120} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="text-blue-600" /> Improvement Roadmap
            <span className="text-sm font-normal text-gray-500 ml-auto bg-gray-100 px-3 py-1 rounded-full">
                Est. Time: {data.estimatedImprovementTime}
            </span>
        </h3>

        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200"></div>

            <div className="space-y-8">
                {data.improvementPlan.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-6 group">
                         <div className="absolute left-4 w-3 h-3 bg-white border-2 border-blue-600 rounded-full -translate-x-[5px] mt-2 z-10"></div>
                         <div className="ml-10 w-full bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 text-lg">{step.action}</h4>
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{step.timeline}</span>
                            </div>
                            <p className="text-gray-600 text-sm flex items-center gap-2">
                                <ChevronRight size={14} className="text-blue-500" />
                                <span className="font-medium text-blue-700">Impact:</span> {step.impact}
                            </p>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-400 mt-8">
        Disclaimer: This analysis is generated by AI for educational purposes only. It does not constitute a formal loan offer or guarantee approval from any financial institution.
      </div>
    </div>
  );
};

export default Dashboard;