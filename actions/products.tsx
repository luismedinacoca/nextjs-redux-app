import { Product } from "@/types/types";

export const getAllProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=12");
    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }
    const products = await res.json();
    return products.products as Product[];
  } catch (error) {
    throw error;
  }
};
