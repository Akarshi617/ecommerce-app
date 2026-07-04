import { createContext, useState, useContext, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getFromStorage("user", null));

  useEffect(() => {
    saveToStorage("user", user);
  }, [user]);

  // email + name se login (Navbar modal isse use karta hai)
  const login = (name, email) => {
    setUser({ name, email });
  };

  // seedha guest ke naam se login, checkout page ke liye
  const loginAsGuest = () => {
    setUser({ name: "Guest", email: "guest@mystore.com" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
