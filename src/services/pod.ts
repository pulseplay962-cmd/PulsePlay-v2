const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

type GenerateAIMerchRequest = {
  name: string;
  description: string;
  category?: string;
  price?: string;
  prompt?: string;
  sku?: string;
};

export type GenerateAIMerchResponse = {
  merchandise: {
    id: string;
    name: string;
    description: string;
    category?: string;
    collection?: string;
    price: number;
    sku?: string;
    supplier?: string;
    image_url?: string;
    images?: string[];
    product_url?: string;
    status?: string;
    created_at?: string;
  };
  printful: Record<string, any>;
};

export async function generateAIMerch(
  payload: GenerateAIMerchRequest
): Promise<GenerateAIMerchResponse> {
  const response = await fetch(`${API_URL}/api/ai/pod/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed generating AI POD merchandise");
  }

  return data as GenerateAIMerchResponse;
}
