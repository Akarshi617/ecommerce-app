import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart } = useCart();

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default Checkout;