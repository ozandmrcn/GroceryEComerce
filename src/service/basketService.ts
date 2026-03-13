import {
  AddToBasketResponse,
  CheckoutSingleItemResponse,
  GetCartItemsResponse,
  GetMyOrdersResponse,
  Product,
} from "@/types";
// Base API Adress
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Get userId from localStorage
const getUserId = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem("grocery_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.userId || null;
    }
  } catch (error) {
    console.error("Error getting user ID from localStorage:", error);
  }

  return null;
};

// Add product to basket
const addToBasket = async (
  productId: string,
  quantity: number,
): AddToBasketResponse => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "POST",
    body: JSON.stringify({ userId, groceryId: productId, quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};

// Bring products in basket
const getCartItems = async (): GetCartItemsResponse => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// Create payment order
const checkoutSingleItem = async (
  grocery: Product,
  quantity: number,
): CheckoutSingleItemResponse => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const body = {
    grocery: {
      _id: grocery._id,
      name: grocery.name,
      price: grocery.price,
      description: grocery.description,
    },
    quantity,
    customerInfo: {
      userId: userId,
      name: userId,
      phone: "1234567890",
      deliveryAddress: "123 Main st",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// Checkout all items in cart
const checkoutAllItems = async (): CheckoutSingleItemResponse => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const body = {
    userId,
    customerInfo: {
      userId: userId,
      name: userId,
      phone: "1234567890",
      deliveryAddress: "123 Main st",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    let errorMessage = "Checkout failed";
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorMessage;
    } catch (e) {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return res.json();
};

// Clear cart
const clearCart = async () => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`, {
    method: "DELETE",
  });

  return res.json();
};

// Remove item from cart
const removeCartItem = async (groceryId: string) => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const res = await fetch(
    `${BASE_URL}/api/cart/item?userId=${userId}&groceryId=${groceryId}`,
    {
      method: "DELETE",
    },
  );

  return res.json();
};

// Update item in cart
const updateCartItem = async (groceryId: string, quantity: number) => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const res = await fetch(`${BASE_URL}/api/cart/item`, {
    method: "PUT",
    body: JSON.stringify({ userId, groceryId, quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// Bring my orders
const getMyOrders = async (): GetMyOrdersResponse => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please login first.");
  }

  const res = await fetch(`${BASE_URL}/api/orders?customer_id=${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export {
  addToBasket,
  checkoutSingleItem,
  getUserId,
  getCartItems,
  clearCart,
  updateCartItem,
  removeCartItem,
  checkoutAllItems,
  getMyOrders,
};
