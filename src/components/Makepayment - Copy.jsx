import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Logic to handle both single product and cart orders
  const getInitialProduct = () => {
    const state = location.state;
    if (!state) return null;

    // If coming from Cart, we wrap the cart data into the 'product' format 
    // so the existing STK push logic doesn't break.
    if (state.isCartOrder) {
      return {
        product_name: `Lumine Collection (${state.cartItems.length} items)`,
        product_description: state.cartItems.map(i => `${i.product_name} (x${i.quantity})`).join(", "),
        product_cost: state.totalCost,
        product_photo: state.cartItems[0].product_photo, // Use first item as preview
        isCart: true,
        items: state.cartItems
      };
    }
    return state.product;
  };

  const product = getInitialProduct();
  const img_url = "https://keyafidel.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      // This remains unchanged: it still pulls from product.product_cost
      formdata.append("amount", product.product_cost);

      const response = await axios.post(
        "https://keyafidel.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
    } catch (error) {
      setLoading(false);
      setError("Payment failed. Please try again.");
    }
  };

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: "'Playfair Display', serif" }}>
        <h2 style={{ color: '#ff4d4d' }}>No selection identified</h2>
        <button onClick={() => navigate("/")} style={{ border: 'none', background: 'none', color: '#b8924e', fontWeight: '700', cursor: 'pointer', letterSpacing: '2px' }}>RETURN TO GALLERY</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexWrap: 'wrap', gap: '40px', position: 'relative' }}>
        
        <button 
          onClick={() => navigate(product.isCart ? "/cart" : "/")} 
          style={{ position: 'absolute', top: '-40px', left: '0', background: 'none', border: 'none', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', cursor: 'pointer', color: '#666' }}
        >
          ← BACK TO {product.isCart ? "CART" : "COLLECTION"}
        </button>

        <div style={{ flex: '1 1 350px' }}>
          {/* Displaying the photo from the item (or first item in cart) */}
          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
            style={{ width: '100%', height: '450px', objectFit: 'cover', border: '1px solid #f2f2f2' }}
          />
        </div>

        <div style={{ flex: '1 1 350px', textAlign: 'left' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: '400', marginBottom: '10px' }}>
            Secure Checkout
          </h1>
          <p style={{ color: '#b8924e', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '700', marginBottom: '30px' }}>
            M-Pesa Express Transaction
          </p>

          <div style={{ borderBottom: '1px solid #f2f2f2', paddingBottom: '20px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '5px' }}>{product.product_name}</h2>
            
            {/* Scrollable item list if it's a cart order */}
            {product.isCart ? (
              <div style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '15px' }}>
                 <p style={{ color: '#777', fontSize: '0.8rem', fontStyle: 'italic' }}>{product.product_description}</p>
              </div>
            ) : (
              <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: '1.6' }}>{product.product_description}</p>
            )}

            <h3 style={{ fontSize: '1.4rem', fontWeight: '400', marginTop: '15px' }}>KES {Number(product.product_cost).toLocaleString()}</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {loading && <div style={{ marginBottom: '20px' }}><Loader /></div>}
            {success && <p style={{ color: '#27ae60', fontSize: '0.85rem', fontWeight: '600' }}>{success}</p>}
            {error && <p style={{ color: '#ff4d4d', fontSize: '0.85rem', fontWeight: '600' }}>{error}</p>}

            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '5px', color: '#999' }}>PAYMENT PHONE NUMBER</label>
            <input
              type="tel"
              placeholder="254XXXXXXXXX"
              style={{ 
                width: '100%', 
                padding: '12px 0', 
                marginBottom: '30px', 
                border: 'none', 
                borderBottom: '2px solid #1a1a1a', 
                outline: 'none', 
                fontSize: '1rem',
                letterSpacing: '2px',
                background: 'transparent'
              }}
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                setError("");
              }}
              required
            />

            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '18px', 
                backgroundColor: '#1a1a1a', 
                color: '#fff', 
                border: 'none', 
                fontWeight: '700', 
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b8924e'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
            >
              Authorize Payment
            </button>
          </form>
          
          <p style={{ fontSize: '0.6rem', color: '#ccc', marginTop: '20px', textAlign: 'center', letterSpacing: '1px' }}>
            ENCRYPTED SECURE PAYMENT PORTAL
          </p>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;