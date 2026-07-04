import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByPrice = searchParams.get("sort") === "price";
  const activeCategory = searchParams.get("category") || "all";

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url =
      activeCategory === "all"
        ? "https://dummyjson.com/products?limit=100"
        : `https://dummyjson.com/products/category/${activeCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, [activeCategory]);

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (slug) => {
    setSearchParams(slug === "all" ? {} : { category: slug });
  };

  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortByPrice) {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  return (
    <div style={{ padding: "110px 40px 40px", background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Category Tabs */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        <button
          onClick={() => handleCategoryClick("all")}
          style={categoryBtnStyle(activeCategory === "all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            style={categoryBtnStyle(activeCategory === cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ color: "#1a1a2e", margin: 0, textTransform: "capitalize" }}>
          {sortByPrice ? "Best Prices" : activeCategory === "all" ? "All Products" : activeCategory}
        </h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            width: "260px",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
          Loading products...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ color: "#777" }}>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => goToProduct(item.id)}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: "100%", borderRadius: "8px", height: "160px", objectFit: "cover" }}
              />
              <h4 style={{ margin: "12px 0 6px", color: "#1a1a2e" }}>{item.title}</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{ color: "#facc15", fontSize: "14px" }}>★</span>
                <span style={{ color: "#777", fontSize: "13px" }}>{item.rating}</span>
              </div>
              <p style={{ color: "#e94560", fontWeight: "700", fontSize: "16px" }}>
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function categoryBtnStyle(active) {
  return {
    padding: "8px 18px",
    borderRadius: "20px",
    border: active ? "none" : "1px solid #ddd",
    background: active ? "#1a1a2e" : "#fff",
    color: active ? "#fff" : "#333",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    textTransform: "capitalize",
  };
}

export default Shop;
