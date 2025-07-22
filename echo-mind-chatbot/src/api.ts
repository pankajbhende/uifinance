const BACKEND_URL = 'https://financialinc-1339752296.asia-south1.run.app';

export interface AskRequest {
  age: number;
  is_minority: boolean;
  salary: number;
  question: string;
}

export interface AskResponse {
  answer: string;
}

export const fetchTaxInfo = async (request: AskRequest): Promise<AskResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
