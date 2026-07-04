import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        Loading...
      </p>
    );
  }

  // rating ko stars mein convert karne ke liye
  const fullStars = Math.round(product.rating);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        padding: "50px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: "340px", borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      />

      <div style={{ flex: 1, minWidth: "280px" }}>
        <p style={{ color: "#999", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>
          {product.category}
        </p>
        <h2 style={{ color: "#1a1a2e", margin: "6px 0 10px" }}>{product.title}</h2>
        <p style={{ color: "#555", fontSize: "13px", marginBottom: "6px" }}>
          Brand: <strong>{product.brand || "N/A"}</strong>
        </p>

        {/* Rating stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          <span style={{ color: "#facc15", fontSize: "18px" }}>
            {"★".repeat(fullStars)}
            {"☆".repeat(5 - fullStars)}
          </span>
          <span style={{ color: "#555", fontSize: "14px" }}>
            {product.rating} ({product.stock} in stock)
          </span>
        </div>

        <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "20px" }}>
          {product.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
        <h3 style={{ color: "#e94560", fontSize: "28px", margin: 0 }}>
  ₹{product.price}
</h3>
          {product.discountPercentage && (
            <span
              style={{
                background: "#dcfce7",
                color: "#16a34a",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          style={{
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#fff",
            background: added ? "#16a34a" : "#1a1a2e",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;