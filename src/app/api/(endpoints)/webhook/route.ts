import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongo from "../../utils/connectMongo";
import Order from "../../models/Order";
import Grocery from "../../models/Grocery";
import Cart from "../../models/Cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type === "checkout.session.completed") {
      const session = body.data.object;
      const userId = session.client_reference_id;
      const metadata = session.metadata;

      if (!userId) {
        console.error("No userId found in session");
        return NextResponse.json({ status: "error", message: "No userId" });
      }

      await connectMongo();

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      for (const item of lineItems.data) {
        // Get stripe product to access metadata where we stored MongoDB product_id
        const product = await stripe.products.retrieve(
          item.price?.product as string,
        );
        const productId = product.metadata.product_id;

        if (!productId) continue;

        // Create Order
        await Order.create({
          product: productId,
          quantity: item.quantity,
          money_spend: (item.amount_total || 0) / 100,
          currency: (item.currency || "try").toUpperCase(),
          customer_id: userId,
          customer_name: metadata.name || userId,
          customer_phone: metadata.phone || "",
          delivery_address: metadata.address || "",
          is_delivery: !!metadata.address,
        });

        // Update Stock
        await Grocery.findByIdAndUpdate(productId, {
          $inc: { stock: -(item.quantity || 1) },
        });
      }

      // If it was a cart checkout, clear the cart
      if (metadata.type === "cart") {
        await Cart.findOneAndUpdate(
          { userId },
          { $set: { items: [], totalAmount: 0 } },
        );
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
