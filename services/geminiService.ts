import { GoogleGenAI, Type } from "@google/genai";
import { UserFinancialProfile, AIAnalysisResult, RiskLevel } from "../types";

const API_KEY = process.env.API_KEY || '';

// Define the response schema for strict JSON output
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    eligibilityScore: { type: Type.INTEGER, description: "A score from 0 to 100 indicating loan eligibility." },
    riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "The calculated risk level." },
    approvalLikelihood: { type: Type.STRING, enum: ["Likely Approved", "Likely Rejected", "Review Required"] },
    explanation: { type: Type.STRING, description: "A simple, easy-to-understand explanation of the decision in English or Hinglish." },
    keyFactors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          factor: { type: Type.STRING },
          impact: { type: Type.STRING, enum: ["Positive", "Negative"] },
          description: { type: Type.STRING }
        },
        required: ["factor", "impact", "description"]
      }
    },
    improvementPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          action: { type: Type.STRING },
          impact: { type: Type.STRING },
          timeline: { type: Type.STRING }
        },
        required: ["action", "impact", "timeline"]
      }
    },
    estimatedImprovementTime: { type: Type.STRING, description: "Estimated time to see significant score improvement." }
  },
  required: ["eligibilityScore", "riskLevel", "approvalLikelihood", "explanation", "keyFactors", "improvementPlan", "estimatedImprovementTime"]
};

export const analyzeCreditRisk = async (profile: UserFinancialProfile): Promise<AIAnalysisResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `
    You are 'SmartCredit AI', a senior credit risk underwriter and financial advisor for the Indian lending ecosystem.
    
    Analyze the following user profile for a Personal Loan application. 
    Use logic based on Indian banking standards (CIBIL score importance, Debt-to-Income Ratio/FOIR, Credit Utilization).
    
    User Profile:
    ${JSON.stringify(profile, null, 2)}
    
    Task:
    1. Calculate a proprietary eligibility score (0-100).
    2. Assess Risk Level (Low/Medium/High).
    3. Determine Approval Likelihood.
    4. Provide a "Key Factors" list explaining specific reasons (Positive/Negative).
    5. Write a simple, empathetic explanation. Use "Hinglish" (Hindi-English mix) phrasing if it makes the concept clearer for an Indian user, but keep it professional.
    6. Create a concrete, step-by-step improvement plan.

    Constraints:
    - If CIBIL < 650, risk is likely High or Medium.
    - If FOIR (Fixed Obligation to Income Ratio) > 50%, risk increases.
    - High Credit Utilization (>30%) is a negative factor.
    - Be transparent and fair.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more consistent analytical results
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from AI.");
    }

    const data = JSON.parse(resultText) as AIAnalysisResult;
    return data;

  } catch (error) {
    console.error("Error analyzing credit risk:", error);
    // Fallback or re-throw
    throw error;
  }
};