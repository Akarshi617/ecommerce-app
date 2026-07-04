# MyStore - E-Commerce Website

This is my Sprint 06 project for Prodesk IT. I built a single page e-commerce application using React where users can browse products, click on any product to see its full details, add items to a cart, and go through a basic login before checkout.

The main goal of this sprint was to learn client side routing and how to manage global state across different components without using Redux.

## What I Built

### Pages
- Home page with an intro section and some feature cards
- Shop page which fetches all products from an API and shows them in a grid
- Product Detail page which shows full info about one specific product (rating, price, description, discount etc.)
- Login page (guest login only, no real backend)
- Checkout page which is protected - you cannot access it without logging in first

### Cart System
I used React Context API to create a global cart. When you click "Add to Cart" on any product, it gets added to the cart and the cart icon in the navbar updates instantly with a number badge. I also connected it with localStorage so if you refresh the page, your cart items don't disappear.

### Search
Added a search bar on the shop page so you can filter products by typing the name.

### Routing
Used react-router-dom for navigating between pages without reloading the browser. The product detail page uses a dynamic route (/product/:id) and useParams() to fetch the right product based on the URL.

## API Used

Product data comes from this public API:
https://dummyjson.com/products

## Tech Stack

- React (Vite)
- React Router DOM
- Context API for state management
- Plain CSS (inline styling)

## How to Run This Project Locally
npm install
npm run dev

Then open the localhost link shown in the terminal.

## Live Demo

[Add your Vercel/Netlify link here]

## Things I'd Improve Later

- Add real payment gateway instead of just showing options in a popup
- Make cart items removable (currently you can only add, not remove)
- Add quantity selector for each product
- Better error handling if the API fails to load

---

Developed by **Akarshi Agrahari**
