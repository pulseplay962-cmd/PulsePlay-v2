import { supabase } from "../lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get products error:", error);
    throw error;
  }

  return data;
}

export async function addProduct(product: any) {
  console.log("Adding product:", product);

  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error("Add product error:", error);
    throw error;
  }

  return data;
}

export async function updateProduct(
  id: string,
  product: any
) {
  console.log("Updating product:", id, product);

  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update product error:", error);
    throw error;
  }

  return data;
}

export async function deleteProduct(id: string) {
  console.log("Deleting product:", id);

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete product error:", error);
    throw error;
  }

  return true;
}