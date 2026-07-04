import { createContext, useState, useContext, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getFromStorage("user", null));

  useEffect(() => {
    saveToStorage("user", user);
  }, [user]);

  // name aur email dono se login, name ke pehle 2 letters avatar ke liye use honge
  const login = (name, email) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
