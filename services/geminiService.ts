
import { GoogleGenAI } from "@google/genai";

// HM-V12 Fix: Initializing GoogleGenAI with named parameter apiKey from process.env.API_KEY exclusively
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const formatContactEmail = async (form: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Formate um email profissional para: ${JSON.stringify(form)}`,
  });
  // HM-V12 Fix: Accessing .text property directly from GenerateContentResponse
  return response.text;
};

export const agentTicketAnalyst = async (ticket: any, threads: any[], docs: any[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analise este ticket jurídico: ${ticket.assunto}`,
  });
  // HM-V12 Fix: Accessing .text property directly from GenerateContentResponse
  return { sugestao_resposta: response.text };
};

export async function* streamOrchestratedResponse(prompt: string, history: any[], agentId: string) {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Você é um assistente jurídico especializado no agente: ${agentId}.`
    }
  });

  const result = await chat.sendMessageStream({ message: prompt });
  for await (const chunk of result) {
    // HM-V12 Fix: Accessing .text property directly from GenerateContentResponse chunk
    yield chunk.text;
  }
}
