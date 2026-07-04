import { createContext, useState, useContext, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getFromStorage("cart", []));

  useEffect(() => {
    saveToStorage("cart", cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
