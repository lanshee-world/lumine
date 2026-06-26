import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post("https://keyafidel.alwaysdata.net/api/add_product", formdata);

      setLoading(false);
      setSuccess(response.data.message);

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      e.target.reset();

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // Luxury UI Styles
  const inputStyle = {
    width: '100%',
    padding: '12px 0',
    marginBottom: '25px',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    outline: 'none',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    background: 'transparent',
    borderRadius: '0'
  };

  const labelStyle = {
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#b8924e',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '5px'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfcfc', padding: '40px' }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '600px', 
        backgroundColor: '#fff', 
        padding: '50px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
        border: '1px solid #f0f0f0'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400', color: '#1a1a1a', fontSize: '1.8rem' }}>
            Inventory Management
          </h2>
          <p style={{ color: '#b8924e', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '700', marginTop: '10px' }}>
            Add New Luxury Item
          </p>
        </div>

        {loading && <div style={{ marginBottom: '20px' }}><Loader /></div>}
        {success && <p style={{ color: '#27ae60', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px' }}>{success}</p>}
        {error && <p style={{ color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <label style={labelStyle}>Product Name</label>
          <input
            type="text"
            placeholder="e.g. Obsidian Silk Scarf"
            style={inputStyle}
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label style={labelStyle}>Description</label>
          <input
            type="text"
            placeholder="Describe the craftsmanship..."
            style={inputStyle}
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          <label style={labelStyle}>Retail Price (KES)</label>
          <input
            type="number"
            placeholder="0.00"
            style={inputStyle}
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />

          <div style={{ marginBottom: '40px' }}>
            <label style={labelStyle}>Product Imagery</label>
            <input
              type="file"
              style={{ 
                fontSize: '0.8rem', 
                color: '#666',
                width: '100%',
                padding: '10px 0'
              }}
              required
              accept="image/*"
              onChange={(e) => setProductPhoto(e.target.files[0])}
            />
          </div>

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
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#b8924e';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Confirm Entry
          </button>

        </form>
      </div>
    </div>
  );
}

export default Addproducts;