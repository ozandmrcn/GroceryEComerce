import { GetAllProductsResponse, GetProductByIdResponse, Product } from "@/types";

// Base API Adress
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all products
export const getAllProducts = async (): GetAllProductsResponse => {
  const response = await fetch(`${BASE_URL}/api/groceries`);



  return response.json();
};

export const getProductById = async (id: string): GetProductByIdResponse => {
  const res = await fetch(`${BASE_URL}/api/groceries/${id}`)

  return res.json();

}
