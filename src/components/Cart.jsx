import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const img_url = "https://keyafidel.alwaysdata.net/static/images/";
  
  // Calculate total based on price * quantity
  const total = cart.reduce((sum, item) => sum + (Number(item.product_cost) * (item.quantity || 1)), 0);

  const qtyBtnStyle = {
    border: '1px solid #e0e0e0',
    background: 'none',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: '0.2s'
  };

  return (
    <div className="container py-5">
      <h2 style={{ 
        fontFamily: "'Playfair Display', serif", 
        textAlign: 'center', 
        marginBottom: '40px', 
        letterSpacing: '3px', 
        textTransform: 'uppercase' 
      }}>
        Review Selection
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <p style={{ color: '#999', letterSpacing: '2px' }}>YOUR COLLECTION IS EMPTY.</p>
          <button 
            onClick={() => navigate("/")} 
            style={{ 
              border: 'none', 
              background: 'none', 
              color: '#b8924e', 
              fontWeight: '700', 
              cursor: 'pointer', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              fontSize: '0.8rem' 
            }}
          >
            Browse Gallery
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cart.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-4 pb-4" style={{ borderBottom: '1px solid #f2f2f2' }}>
                <img 
                  src={img_url + item.product_photo} 
                  alt={item.product_name} 
                  style={{ width: '80px', height: '110px', objectFit: 'cover' }} 
                />
                
                <div className="ms-4 flex-grow-1">
                  <h5 style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '5px' }}>{item.product_name}</h5>
                  <p style={{ color: '#b8924e', fontWeight: '700', fontSize: '0.85rem' }}>
                    KES {Number(item.product_cost).toLocaleString()}
                  </p>
                  
                  {/* Quantity Selection */}
                  <div className="d-flex align-items-center mt-2">
                    <button style={qtyBtnStyle} onClick={() => updateQuantity(index, -1)}>-</button>
                    <span style={{ margin: '0 15px', fontSize: '0.85rem', fontWeight: '700' }}>
                      {item.quantity || 1}
                    </span>
                    <button style={qtyBtnStyle} onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                </div>

                <div className="text-end">
                  <p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px' }}>
                    KES {(item.product_cost * (item.quantity || 1)).toLocaleString()}
                  </p>
                  <button 
                    onClick={() => removeFromCart(index)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#999', 
                      fontSize: '0.65rem', 
                      fontWeight: '700', 
                      letterSpacing: '1px', 
                      textTransform: 'uppercase' 
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div style={{ backgroundColor: '#fcfcfc', padding: '30px', border: '1px solid #f0f0f0' }}>
              <h4 style={{ 
                fontSize: '0.75rem', 
                fontWeight: '700', 
                letterSpacing: '2px', 
                marginBottom: '25px', 
                color: '#b8924e' 
              }}>
                ESTIMATED TOTAL
              </h4>
              
              <div className="d-flex justify-content-between mb-4">
                <span style={{ fontSize: '0.85rem' }}>Subtotal</span>
                <span style={{ fontWeight: '700' }}>KES {total.toLocaleString()}</span>
              </div>

              {/* Navigation passes isCartOrder and the full cart array */}
              <button 
                className="btn btn-dark w-100 py-3"
                style={{ 
                  borderRadius: '0', 
                  backgroundColor: '#1a1a1a', 
                  letterSpacing: '2px', 
                  fontWeight: '700', 
                  fontSize: '0.8rem' 
                }}
                onClick={() => navigate("/makepayment", { 
                  state: { 
                    isCartOrder: true,
                    cartItems: cart, 
                    totalCost: total 
                  } 
                })}
              >
                PROCEED TO PAYMENT
              </button>
              
              <p style={{ 
                fontSize: '0.6rem', 
                color: '#ccc', 
                marginTop: '15px', 
                textAlign: 'center', 
                letterSpacing: '1px' 
              }}>
                COMPLIMENTARY SHIPPING ON ALL PRESTIGE ORDERS
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;