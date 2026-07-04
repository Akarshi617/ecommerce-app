import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // "payment" | "delivery" | null

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
    <div style={{ minHeight: "90vh", background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", position: "relative" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "100px 20px 60px" }}>
        <p style={{ color: "#e94560", fontWeight: "700", letterSpacing: "2px", marginBottom: "10px" }}>
          NEW COLLECTION 2026
        </p>
        <h1 style={{ fontSize: "52px", color: "#1a1a2e", marginBottom: "16px", fontWeight: "800" }}>
          Shop Smarter with <span style={{ color: "#e94560" }}>MyStore</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#555", marginBottom: "35px" }}>
          Discover top-quality products at prices you'll love
        </p>
        <Link to="/shop">
          <button
            style={{
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
              background: "#e94560",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(233, 69, 96, 0.4)",
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
              background: "#fff",
              borderRadius: "16px",
              padding: "30px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
            <h4 style={{ color: "#1a1a2e", marginBottom: "8px" }}>{f.title}</h4>
            <p style={{ color: "#777", fontSize: "14px" }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Secure Payment Modal */}
      {activeModal === "payment" && (
        <Modal onClose={() => setActiveModal(null)} title="Secure Payment Options">
          <PaymentOptions />
        </Modal>
      )}

      {/* Fast Delivery Modal */}
      {activeModal === "delivery" && (
        <Modal onClose={() => setActiveModal(null)} title="Fast Delivery Info">
          <DeliveryInfo />
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal wrapper
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
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          width: "360px",
          maxWidth: "90%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "#1a1a2e" }}>{title}</h3>
          <span onClick={onClose} style={{ cursor: "pointer", fontSize: "20px", color: "#999" }}>✕</span>
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
            borderBottom: i !== options.length - 1 ? "1px solid #eee" : "none",
          }}
        >
          <span style={{ fontSize: "20px" }}>{opt.icon}</span>
          <span style={{ color: "#333" }}>{opt.name}</span>
        </div>
      ))}
    </div>
  );
}

function DeliveryInfo() {
  return (
    <div style={{ color: "#555", lineHeight: "1.8" }}>
      <p>📦 Standard Delivery: <strong>2-3 business days</strong></p>
      <p>⚡ Express Delivery: <strong>Next day</strong></p>
      <p>🌍 We deliver across all major cities</p>
      <p>📍 Live order tracking available after checkout</p>
    </div>
  );
}

export default Home;