import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        background: "linear-gradient(90deg, #1a1a2e, #16213e)",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2 style={{ margin: 0, letterSpacing: "1px", fontWeight: "700" }}>
        🛍️ MyStore
      </h2>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/shop" style={navLinkStyle}>Shop</Link>

        {isLoggedIn ? (
          <span style={{ color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
            ● Guest User
          </span>
        ) : (
          <Link to="/login" style={navLinkStyle}>Login</Link>
        )}

        <div style={{ position: "relative", fontSize: "22px" }}>
          🛒
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-12px",
                background: "#e94560",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
};

export default Navbar;