import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";
import { Product } from "@/types";

export async function getAllProductsFromDb(filters: any = {}) {
  await connectMongo();
  
  let mongoFilters: any = {};
  
  if (filters.category) {
    mongoFilters.category = filters.category;
  }
  
  if (filters.query) {
    mongoFilters.$or = [
      { name: { $regex: filters.query, $options: 'i' } },
      { description: { $regex: filters.query, $options: 'i' } }
    ];
  }
  
  if (filters.organic === 'true' || filters.organic === true) {
    mongoFilters.isOrganic = true;
  }

  const groceries = await Grocery.find(mongoFilters);
  return { groceries: JSON.parse(JSON.stringify(groceries)) as Product[] };
}


export async function getProductByIdFromDb(id: string) {
  await connectMongo();
  const grocery = await Grocery.findById(id);
  return { grocery: JSON.parse(JSON.stringify(grocery)) as Product };
}
