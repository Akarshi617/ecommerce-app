import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cart, removeFromCart } = useCart();
  const { user, isLoggedIn, login, logout } = useAuth();

  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const cartRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login(name.trim(), email.trim());
    setLoginOpen(false);
    setName("");
    setEmail("");
  };

  const getInitials = (fullName) => {
    if (!fullName || typeof fullName !== "string") return "?";
    return fullName.trim().slice(0, 2).toUpperCase();
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 24px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e5e7eb",
          zIndex: 999,
          overflow: "visible",
        }}
      >
        {/* Left side — logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "800",
            fontSize: "18px",
            color: "#1e293b",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 8H18L17 20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20L6 8Z"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          MyStore
        </Link>

        {/* Right side — Home, Shop, Cart, Login */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <Link to="/" style={{ color: "#334155", textDecoration: "none", fontWeight: "600", fontSize: "13px", whiteSpace: "nowrap" }}>
            Home
          </Link>
          <Link to="/shop" style={{ color: "#334155", textDecoration: "none", fontWeight: "600", fontSize: "13px", whiteSpace: "nowrap" }}>
            Shop
          </Link>

          {/* Cart Icon */}
          <div ref={cartRef} style={{ position: "relative" }}>
            <button
              onClick={() => setCartOpen((prev) => !prev)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                position: "relative",
                color: "#1e293b",
                padding: 0,
              }}
            >
              🛒
              {cart.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "#f59e0b",
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: "10px",
                    fontWeight: "700",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </button>

            {cartOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  right: 0,
                  width: "280px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  padding: "16px",
                }}
              >
                <h4 style={{ margin: "0 0 12px", color: "#1e293b" }}>Your Cart</h4>

                {cart.length === 0 ? (
                  <p style={{ color: "#94a3b8", fontSize: "14px" }}>Cart is empty</p>
                ) : (
                  <>
                    <div style={{ maxHeight: "260px", overflowY: "auto" }}>
                      {cart.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 0",
                            borderBottom: "1px solid #f1f5f9",
                          }}
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: "13px", color: "#1e293b" }}>{item.title}</p>
                            <p style={{ margin: 0, fontSize: "12px", color: "#f59e0b", fontWeight: "700" }}>
                              ₹{item.price}
                            </p>
                          </div>
                          <span
                            onClick={() => removeFromCart(item.id)}
                            style={{ cursor: "pointer", color: "#94a3b8", fontSize: "16px" }}
                          >
                            ✕
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontWeight: "700", color: "#1e293b" }}>
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Login / Profile */}
          {isLoggedIn && user ? (
            <div ref={profileRef} style={{ position: "relative" }}>
              <div
                onClick={() => setProfileOpen((prev) => !prev)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#f59e0b",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "12px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {getInitials(user.name)}
              </div>

              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "44px",
                    right: 0,
                    width: "190px",
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    padding: "14px",
                  }}
                >
                  <p style={{ margin: "0 0 4px", fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>{user.name}</p>
                  <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#94a3b8" }}>{user.email}</p>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#f1f5f9",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "#1e293b",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              style={{
                padding: "7px 16px",
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {loginOpen && (
        <div
          onClick={() => setLoginOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleLoginSubmit}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "28px",
              width: "320px",
              maxWidth: "90%",
            }}
          >
            <h3 style={{ margin: "0 0 18px", color: "#1e293b" }}>Login with Email</h3>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "18px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;
