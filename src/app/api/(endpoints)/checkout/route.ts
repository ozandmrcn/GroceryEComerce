import { NextResponse } from "next/server";
import connectMongo from "../../utils/connectMongo";
import Order from "../../models/Order";
import Grocery from "../../models/Grocery";
import Cart from "../../models/Cart";

// Stripe'ı yükle eğer proje varsa
let stripe: any;
try {
  const Stripe = require("stripe");
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    typescript: true,
  });
} catch (error) {
  console.log("Stripe yüklenemedi:", error);
}

// Katalog'daki aktif ürünleri alıp getirir
const getActiveProducts = async () => {
  if (!stripe) return [];
  let stripeProducts = await stripe.products.list();
  return stripeProducts.data.filter((product: any) => product.active);
};

export async function POST(req: Request) {
  try {
    // İstek gövdesinden gelen veriyi al
    const data = await req.json();

    // Tek ürün satın alınıyorsa
    if (data.grocery) {
      return await handleSingleItemCheckout(data);
    }

    // Sepetten satın alınıyorsa
    if (data.cartId || data.userId) {
      return await handleCartCheckout(data);
    }

    return NextResponse.json(
      { message: "Geçersiz istek formatı" },
      { status: 400 },
    );
  } catch (error: any) {
    console.error("CHECKOUT API ERROR:", error);
    return NextResponse.json(
      { message: error?.message || "Bir hata oluştu" },
      { status: 500 },
    );
  }
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
console.log("Using Base URL:", baseUrl);

// Tek ürün satın alma işlemi
async function handleSingleItemCheckout(data: any) {
  const { grocery, quantity, customerInfo } = data;

  await connectMongo();

  // Ürünü veritabanından kontrol et
  const groceryItem = await Grocery.findById(grocery._id);

  if (!groceryItem) {
    return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
  }

  // Stok kontrolü
  if (groceryItem.stock < quantity) {
    return NextResponse.json({ message: "Yetersiz stok" }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json(
      { message: "Ödeme sistemi şu anda kullanılamıyor" },
      { status: 500 },
    );
  }

  // Stripe katalogunda aktif ürünleri al
  const stripeProducts = await getActiveProducts();

  // Satın alınacak ürün katalogda var mı kontrol et
  let foundProduct = stripeProducts.find(
    (product: any) => product.metadata.product_id === grocery._id,
  );

  // Eğer katalogda yoksa ürünü kataloga ekle
  if (!foundProduct) {
    foundProduct = await stripe.products.create({
      name: grocery.name,
      description: grocery.description || "",
      default_price_data: {
        unit_amount: Math.round(grocery.price * 100),
        currency: "try",
      },
      metadata: {
        product_id: grocery._id,
      },
    });
  }

  // Ürünün stripe tarafından oluşturulan id'sini ve satın alınacak ürün miktarını bir nesne haline getir
  const product_info = {
    price: foundProduct.default_price,
    quantity: quantity,
  };

  // Ödeme oturumu (url) oluştur
  const session = await stripe.checkout.sessions.create({
    line_items: [product_info],
    mode: "payment",
    success_url: `${baseUrl}/success?userId=${encodeURIComponent(customerInfo.userId)}`,
    cancel_url: `${baseUrl}/cancel?userId=${encodeURIComponent(customerInfo.userId)}`,
    client_reference_id: customerInfo.userId,
    metadata: {
      type: "single",
      groceryId: grocery._id,
      quantity: quantity.toString(),
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.deliveryAddress || "",
    },
  });

  // Kullanıcıyı oluştuturulan linke yönlendir
  return NextResponse.json({ url: session.url });
}

// Sepetten toplu satın alma işlemi
async function handleCartCheckout(data: any) {
  const { userId, customerInfo } = data;

  if (!userId) {
    return NextResponse.json(
      { message: "Kullanıcı ID gerekli" },
      { status: 400 },
    );
  }

  await connectMongo();

  // Kullanıcının sepetini bul
  const cart = await Cart.findOne({ userId }).populate("items.grocery");

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      { message: "Sepet boş veya bulunamadı" },
      { status: 404 },
    );
  }

  if (!stripe) {
    return NextResponse.json(
      { message: "Ödeme sistemi şu anda kullanılamıyor" },
      { status: 500 },
    );
  }

  // Sepetteki her ürün için stok kontrolü yap
  for (const item of cart.items) {
    const grocery = await Grocery.findById(item.grocery);
    if (!grocery) {
      return NextResponse.json(
        {
          message: `Ürün bulunamadı: ${item.name}`,
        },
        { status: 404 },
      );
    }

    if (grocery.stock < item.quantity) {
      return NextResponse.json(
        {
          message: `Yetersiz stok: ${item.name} - Mevcut: ${grocery.stock}, İstenen: ${item.quantity}`,
        },
        { status: 400 },
      );
    }
  }

  // Stripe katalogunda aktif ürünleri al (Döngü dışına alındı)
  const stripeProducts = await getActiveProducts();

  // Stripe için line items oluştur
  const lineItems = [];

  for (const item of cart.items) {
    if (!item.grocery) continue;

    // Ürün katalogda var mı kontrol et
    let foundProduct = stripeProducts.find(
      (product: any) =>
        product.metadata.product_id === item.grocery._id.toString(),
    );

    // Eğer katalogda yoksa ürünü kataloga ekle
    if (!foundProduct) {
      foundProduct = await stripe.products.create({
        name: item.name,
        description: item.grocery.description || "",
        default_price_data: {
          unit_amount: Math.round(item.price * 100),
          currency: "try",
        },
        metadata: {
          product_id: item.grocery._id.toString(),
        },
      });
    }

    // Line items'a ekle
    lineItems.push({
      price: foundProduct.default_price,
      quantity: item.quantity,
    });
  }

  // Ödeme oturumu (url) oluştur
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${baseUrl}/success?userId=${encodeURIComponent(userId)}`,
    cancel_url: `${baseUrl}/cancel?userId=${encodeURIComponent(userId)}`,
    client_reference_id: userId,
    metadata: {
      type: "cart",
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.deliveryAddress || "",
    },
  });

  // Kullanıcıyı oluştuturulan linke yönlendir
  return NextResponse.json({ url: session.url });
}
