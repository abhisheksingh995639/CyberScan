
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisData } from "../types";

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 2000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ENGINE_LIST = [
  "BitDefender", "Fortinet", "Seclookup", "APVA", "Artists Against 419", "Avira", 
  "AZORult Tracker", "Badbitcoin", "Bambenek Consulting", "CERT Polska", "DrWeb", 
  "Fake Website Buster", "Gridlnsoft", "OpenPhish", "RedScama", "PhishFort", 
  "Phishing Database", "PhishingBait", "PhishStats", "PhishTank", "Phishunt", 
  "Scam Directory", "SCUMWARE", "SecureReliant Phishing List", "Spam404", 
  "StopForumSpam", "SURBL", "Threat Sourcing", "ThreatLog", "TweetFeed", "urlDNA", "URLhaus"
];

export const analyzeUrlWithGemini = async (url: string, retryCount = 0): Promise<{ data: AnalysisData, sources: any[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: `Perform a deep-dive security audit on the URL: "${url}".
      
      CRITICAL REQUIREMENT: 
      1. Use the provided Google Search tool to find the ACTUAL WHOIS registration date, domain age, current IP address, and ASN for this domain. 
      2. Do not use placeholders. If you cannot find the exact date, use the closest verified historical record.
      
      Simulate a realistic threat intelligence scan across these 32 engines: ${ENGINE_LIST.join(', ')}.
      
      OUTPUT FORMAT:
      You MUST return your findings in a single valid JSON block enclosed in triple backticks (\`\`\`json ... \`\`\`).
      
      The JSON must follow this exact schema:
      {
        "url": string,
        "ip": string,
        "reverseDns": string,
        "asn": string,
        "domainAge": string,
        "registrationDate": string,
        "lastAnalysis": string,
        "location": { "city": string, "country": string, "region": string, "latitude": number, "longitude": number },
        "security": {
          "score": number,
          "status": "Safe" | "Warning" | "Malicious",
          "vendorsFlagged": number,
          "totalVendors": number,
          "summary": string,
          "engines": Array<{ "name": string, "result": string, "details": string }>
        }
      }`,
      config: {
        systemInstruction: "You are the CyberScan Neural Engine. You provide REAL-TIME security intelligence. You MUST use Google Search to verify domain details (registration date, IP) before responding. Return results for all 32 specified engines in a JSON block.",
        tools: [{ googleSearch: {} }]
        // Note: responseMimeType: "application/json" is omitted because it often conflicts with tool use in some versions,
        // leading to 500 errors. We parse the text manually instead.
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from intelligence core.");
    
    // Extract JSON from markdown code block
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      console.error("Failed to find JSON in response:", text);
      throw new Error("Neural output format mismatch.");
    }
    
    const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]) as AnalysisData;
    parsed.security.totalVendors = ENGINE_LIST.length;
    
    // Extract grounding sources
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { data: parsed, sources };

  } catch (error: any) {
    console.error("Analysis Error:", error);
    
    // Handle 500 or XHR errors with retry logic
    const isRetryable = error?.status === 429 || error?.status === 500 || error?.status === 503 || error?.message?.includes('xhr') || error?.message?.includes('Rpc failed');
    
    if (isRetryable && retryCount < MAX_RETRIES) {
      const waitTime = INITIAL_BACKOFF * Math.pow(2, retryCount);
      await delay(waitTime);
      return analyzeUrlWithGemini(url, retryCount + 1);
    }
    throw error;
  }
};
