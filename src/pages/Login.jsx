import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate("/checkout");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        padding: "40px",
      }}
    >
      <h2 style={{ color: "#1a1a2e", marginBottom: "16px" }}>Login Required</h2>
      <p style={{ color: "#555", marginBottom: "30px" }}>
        Please login to continue to checkout
      </p>
      <button
        onClick={handleGuestLogin}
        style={{
          padding: "14px 32px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#fff",
          background: "#e94560",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        Login as Guest
      </button>
    </div>
  );
}

export default Login;