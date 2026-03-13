import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Grocery from "@/app/api/models/Grocery";

// Configure cache for this route
export const dynamic = 'force-dynamic'; // Or 'auto' with revalidation options

import { getAllProductsFromDb } from "@/service/productDbService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      category: searchParams.get('category'),
      query: searchParams.get('query'),
      organic: searchParams.get('organic')
    };

    const { groceries } = await getAllProductsFromDb(filters);
    return NextResponse.json({ groceries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching groceries:", error);
    return NextResponse.json({ message: "Manav verileri alınamadı" }, { status: 500 });
  }
}

 