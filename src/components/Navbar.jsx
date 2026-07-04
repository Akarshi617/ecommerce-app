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
        background: "#0a0e27",
        color: "#fff",
        borderBottom: "1px solid #1e2545",
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
          <Link
            to="/login"
            style={{
              background: "#3b82f6",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Login to your account
          </Link>
        )}

        <div style={{ position: "relative", fontSize: "22px" }}>
          🛒
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-12px",
                background: "#facc15",
                color: "#0a0e27",
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
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
};

export default Navbar;
