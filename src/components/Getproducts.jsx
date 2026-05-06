import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = ({ searchQuery, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const img_url = "https://keyafidel.alwaysdata.net/static/images/";

  const theme = {
    accent: "#b8924e",
    dark: "#1a1a1a",
    light: "#fdfdfb"
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://keyafidel.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => 
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: theme.light }}>
      {/* --- HERO SECTION --- */}
      {!searchQuery && (
        <section style={{ 
          height: '85vh', 
          width: '100%', 
          position: 'relative', 
          overflow: 'hidden',
          backgroundColor: theme.dark,
          marginBottom: '60px'
        }}>
          {/* Background Image Overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.6'
          }}></div>

          <div className="container h-100 d-flex flex-column justify-content-center align-items-center text-center" style={{ position: 'relative', zIndex: 2 }}>
            <h6 style={{ color: theme.accent, letterSpacing: '6px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '20px' }}>
              THE PRESTIGE COLLECTION
            </h6>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
              color: '#fff', 
              letterSpacing: '12px', 
              textTransform: 'uppercase',
              lineHeight: '1.1'
            }}>
              Lumine <br/> <span style={{ fontSize: '0.4em', letterSpacing: '15px', color: '#ccc' }}>VANT SERIES</span>
            </h1>
            <p style={{ color: '#fff', maxWidth: '600px', marginTop: '30px', fontSize: '0.9rem', letterSpacing: '2px', fontWeight: '300', opacity: '0.8' }}>
              Curated apparel and jewelry for the modern visionary. <br/> 
              Experience the synergy of style and investment.
            </p>
            <div className="mt-5">
              <button style={{ 
                  background: 'transparent', 
                  border: `1px solid ${theme.accent}`, 
                  color: theme.accent, 
                  padding: '15px 40px', 
                  fontSize: '0.7rem', 
                  fontWeight: '700', 
                  letterSpacing: '3px', 
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </section>
      )}

      {/* --- PRODUCT GRID --- */}
      <div className='container py-5'>
        <h3 className='text-center mb-5' style={{ 
          fontFamily: "'Playfair Display', serif", 
          color: theme.dark, 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontSize: '1.5rem' 
        }}>
          {searchQuery ? `Results for "${searchQuery}"` : "The Collection"}
        </h3>
        
        {loading && <Loader />}
        {error && <h4 className="text-danger text-center">{error}</h4>}

        <div className="row g-5"> 
          {filteredProducts.map((product) => (
            <div className="col-md-4 col-lg-3 d-flex align-items-stretch" key={product.id}>
              <div className="card border-0 w-100 bg-transparent product-card">
                
                <div style={{ height: '350px', overflow: 'hidden', backgroundColor: '#f9f9f9' }}>
                  <img 
                    src={img_url + product.product_photo} 
                    alt={product.product_name}
                    className='w-100 h-100' 
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="card-body d-flex flex-column px-0 py-3 text-start">
                  <h5 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, fontSize: '1.1rem', fontWeight: '400' }}>
                    {product.product_name}
                  </h5>

                  <p className='text-muted small mb-2' style={{ flexGrow: 1, fontSize: '0.75rem' }}>
                    {product.product_description.slice(0, 60)}...
                  </p>

                  <h4 className='mb-3' style={{ color: theme.dark, fontWeight: '600', fontSize: '0.9rem' }}>
                    KES {Number(product.product_cost).toLocaleString()}
                  </h4>

                  <button 
                    className="btn btn-dark w-100 mb-2 py-2" 
                    style={{ 
                      borderRadius: '0px', 
                      fontWeight: '700', 
                      backgroundColor: theme.dark, 
                      border: 'none', 
                      letterSpacing: '2px', 
                      fontSize: '0.7rem', 
                      textTransform: 'uppercase' 
                    }}
                    onClick={() => navigate("/makepayment", { state: { product } })}
                  >
                    Purchase Now
                  </button>

                  <button 
                    className="btn w-100 py-2" 
                    style={{ 
                      borderRadius: '0px', 
                      fontWeight: '700', 
                      backgroundColor: 'transparent', 
                      color: theme.dark,
                      border: `1px solid ${theme.dark}`, 
                      letterSpacing: '2px', 
                      fontSize: '0.7rem', 
                      textTransform: 'uppercase' 
                    }}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Getproducts;