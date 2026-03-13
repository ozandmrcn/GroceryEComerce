# GroceryEComerce

Welcome to the **GroceryEComerce** project! A modern and user-friendly grocery shopping experience built with **Next.js**, **React 19**, and **Tailwind CSS v4**. The app allows users to browse fresh products, manage their cart, and complete secure payments.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Bullseye.png" alt="Bullseye" width="25" height="25" /> Project Overview

GroceryEComerce enables users to:

- Browse fresh fruits and vegetables by categories
- Dynamic cart management (Add, remove, update)
- Secure checkout process with Stripe integration
- Track order history
- Experience a modern and fully responsive UI
- User login system

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Features

- **Modern Tech Stack:** Built with React 19 and Next.js App Router.
- **Payment System:** **Stripe** integration for credit card payments and Webhook support.
- **Database:** Data management with MongoDB via **Mongoose**.
- **UI/UX:** Sleek and fast interface styled with **Tailwind CSS v4**.
- **Notifications:** User interaction feedback with **React Toastify**.
- **Icons:** Rich visual content with **React Icons**.
- **Type Safety:** Fully developed with **TypeScript**.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Technologies Used

- **Next.js** (Framework)
- **React 19** (UI Library)
- **TypeScript** (Type Safety)
- **Tailwind CSS v4** (Modern Styling)
- **Mongoose** (MongoDB ODM)
- **Stripe** (Payment Infrastructure)
- **React Toastify** (Notifications)
- **React Icons** (Icon Sets)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Desktop Computer" width="25" height="25" /> Demo  
You can view a demo of the project by visiting the following link:  
[Grocery E-Comerce Demo](https://grocery-e-comerce.vercel.app/)

## Preview
<a href="https://ibb.co/RT1WbGz4"><img src="https://i.ibb.co/k2pFBVQ6/1.png" alt="1" border="0" /></a>
<a href="https://ibb.co/5WF654rr"><img src="https://i.ibb.co/gMV3D9SS/2.png" alt="2" border="0" /></a>
<a href="https://ibb.co/1JKzd49Y"><img src="https://i.ibb.co/jZGJWjL9/3.png" alt="3" border="0" /></a>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Wrench.png" alt="Wrench" width="25" height="25" /> Installation

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/ozandmrcn/GroceryEComerce.git

# Navigate to the project folder
cd groceryecommerce

# Install required dependencies
npm install

# Run the development server
npm run dev
```

### ⚙️ Environment Variables (.env Setup)

Create a `.env` file in the root directory and fill in the following values with your own credentials:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>

# Stripe Secret Key
STRIPE_SECRET_KEY=sk_test_...

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_...

# App API URL (For local development)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> ⚠️ **Note:** To ensure the payment system works correctly, you need valid Stripe keys and a MongoDB connection.

## 📧 Contact

For any questions or feedback, feel free to contact:  
**Ozan Demircan** – ozandmrcn47@gmail.com
