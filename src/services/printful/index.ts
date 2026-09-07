import { supabase } from "../../lib/supabase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


export type PrintfulVariant = {

  id: number;

  external_id?: string;

  sync_product_id?: number;

  name: string;

  synced?: boolean;

  variant_id?: number;

  retail_price?: string;

  currency?: string;

  sku?: string;

  product?: {

    variant_id?: number;

    product_id?: number;

    image?: string;

    name?: string;

  };

  files?: {

    id?: number;

    type?: string;

    preview_url?: string;

    thumbnail_url?: string;

    filename?: string;

  }[];

};


export type PrintfulProduct = {

  id: number;

  name: string;

  thumbnail_url?: string;

  image?: string;

  description?: string;

  price?: number;

  currency?: string;

  external_id?: string;

  sync_product?: {

    id?: number;

    external_id?: string;

    name?: string;

    thumbnail_url?: string;

  };

  sync_variants?: PrintfulVariant[];

};


export async function getPrintfulProducts(): Promise<
  PrintfulProduct[]
> {

  const response =
    await fetch(
      `${API_URL}/api/printful/products`
    );


  if(!response.ok){

    const text =
      await response.text();

    throw new Error(
      text ||
      `Printful request failed: ${response.status}`
    );

  }


  const data =
    await response.json();


  return data?.result || [];

}


export async function getPrintfulProduct(
  id:number
):Promise<PrintfulProduct>{

  const response =
    await fetch(
      `${API_URL}/api/printful/products/${id}`
    );


  if(!response.ok){

    const text =
      await response.text();

    throw new Error(
      text ||
      `Printful product request failed: ${response.status}`
    );

  }


  const data =
    await response.json();


  return data?.result || data;

}


export type PrintfulSyncResult = {
  success: boolean;
  total: number;
  inserted: number;
  updated: number;
  skipped: number;
  errors: number;
  products: {
    status: string;
    printful_id: number;
    name: string;
    variants?: number;
    price?: string;
    error?: string;
  }[];
};

export async function syncPrintfulMerchandise(): Promise<PrintfulSyncResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("You must be logged in as an administrator.");
  }

  const response = await fetch(
    `${API_URL}/api/printful/sync-merchandise`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
      `Printful sync failed: ${response.status}`
    );
  }

  return data;
}
