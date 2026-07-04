import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const features = [
    { id: "delivery", icon: "🚚", title: "Fast Delivery", desc: "Get your orders in 2-3 days" },
    { id: "payment", icon: "🔒", title: "Secure Payment", desc: "100% safe and encrypted" },
    { id: "price", icon: "💸", title: "Best Prices", desc: "Guaranteed lowest rates" },
  ];

  const handleFeatureClick = (id) => {
    if (id === "payment") setActiveModal("payment");
    else if (id === "delivery") setActiveModal("delivery");
    else if (id === "price") navigate("/shop?sort=price");
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        background: "radial-gradient(circle at 30% 20%, #12183a, #0a0e27 70%)",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "110px 20px 60px" }}>
        <p style={{ color: "#facc15", fontWeight: "700", letterSpacing: "2px", marginBottom: "10px" }}>
          NEW COLLECTION 2026
        </p>
        <h1 style={{ fontSize: "52px", color: "#fff", marginBottom: "16px", fontWeight: "800" }}>
          Shop Smarter with <span style={{ color: "#facc15" }}>MyStore</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#9ca3af", marginBottom: "35px" }}>
          Discover top-quality products at prices you'll love
        </p>
        <Link to="/shop">
          <button
            style={{
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#0a0e27",
              background: "#facc15",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(250, 204, 21, 0.35)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Start Shopping →
          </button>
        </Link>
      </div>

      {/* Feature Cards Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          padding: "20px 40px 80px",
        }}
      >
        {features.map((f) => (
          <div
            key={f.id}
            onClick={() => handleFeatureClick(f.id)}
            style={{
              background: "#12183a",
              border: "1px solid #1e2545",
              borderRadius: "16px",
              padding: "30px",
              width: "220px",
              textAlign: "center",
              transition: "transform 0.3s, border-color 0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#3b82f6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#1e2545";
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
            <h4 style={{ color: "#fff", marginBottom: "8px" }}>{f.title}</h4>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {activeModal === "payment" && (
        <Modal onClose={() => setActiveModal(null)} title="Secure Payment Options">
          <PaymentOptions />
        </Modal>
      )}
      {activeModal === "delivery" && (
        <Modal onClose={() => setActiveModal(null)} title="Fast Delivery Info">
          <DeliveryInfo />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#12183a",
          border: "1px solid #1e2545",
          borderRadius: "16px",
          padding: "30px",
          width: "360px",
          maxWidth: "90%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "#fff" }}>{title}</h3>
          <span onClick={onClose} style={{ cursor: "pointer", fontSize: "20px", color: "#9ca3af" }}>✕</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function PaymentOptions() {
  const options = [
    { icon: "💳", name: "Credit / Debit Card" },
    { icon: "📱", name: "UPI" },
    { icon: "💵", name: "Cash on Delivery" },
    { icon: "🏦", name: "Net Banking" },
  ];
  return (
    <div>
      {options.map((opt, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 0",
            borderBottom: i !== options.length - 1 ? "1px solid #1e2545" : "none",
            color: "#e5e7eb",
          }}
        >
          <span style={{ fontSize: "20px" }}>{opt.icon}</span>
          <span>{opt.name}</span>
        </div>
      ))}
    </div>
  );
}

function DeliveryInfo() {
  return (
    <div style={{ color: "#9ca3af", lineHeight: "1.8" }}>
      <p>📦 Standard Delivery: <strong style={{ color: "#fff" }}>2-3 business days</strong></p>
      <p>⚡ Express Delivery: <strong style={{ color: "#fff" }}>Next day</strong></p>
      <p>🌍 We deliver across all major cities</p>
      <p>📍 Live order tracking available after checkout</p>
    </div>
  );
}

export default Home;
