import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayment from './components/Makepayment';
import Addproducts from './components/Addproducts';
import Notfound from './components/Notfound';
import Getproducts from './components/Getproducts';
import Cart from './components/Cart';
import About from './components/Aboutus'; 
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("lumine_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    localStorage.setItem("lumine_cart", JSON.stringify(cart));
  }, [cart]);

  const handleSubscribe = async () => {
    if (!subscriberEmail) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriberEmail }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) setSubscriberEmail(""); 
    } catch (error) {
      alert("Lumine servers are currently unreachable.");
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => 
        (product.id && item.id === product.id) || (item.product_name === product.product_name)
      );
      if (existingItem) {
        return prevCart.map(item =>
          ((product.id && item.id === product.id) || (item.product_name === product.product_name))
            ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  
  const updateQuantity = (index, delta) => {
    setCart((prevCart) => prevCart.map((item, i) => 
      i === index ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    ));
  };

  const isAdmin = userEmail === "fidel@lumine.com";
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    window.location.href = "/";
  };

  const theme = {
    bodyBg: "#fdfdfb", 
    footerBg: "#f7f7f5", 
    accent: "#b8924e", 
    dark: "#1a1a1a" 
  };

  const navItemStyle = {
    textDecoration: 'none', color: theme.dark, fontSize: '0.75rem',
    fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 15px'
  };

  return (
    <Router>
      <div className="App" style={{ backgroundColor: theme.bodyBg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <header style={{ padding: '40px 0 20px 0', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', letterSpacing: '8px', textTransform: 'uppercase', color: theme.dark, margin: '0' }}>Lumine</h1>
          <p style={{ color: theme.accent, letterSpacing: '4px', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', marginTop: '10px' }}>Where we uplift your value</p>
        </header>

        {/* Global Navigation */}
        <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: 'rgba(253, 253, 251, 0.95)', backdropFilter: 'blur(10px)', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div className="container d-flex flex-column align-items-center">
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap justify-content-center">
              <Link to="/" style={navItemStyle}>Home</Link>
              <Link to="/about" style={navItemStyle}>About Us</Link>
              <Link to="/cart" style={navItemStyle}>Cart ({cart.length})</Link>
              {isAdmin && <Link to="/addproducts" style={navItemStyle}>Admin</Link>}
              
              {/* --- DYNAMIC AUTH LINKS --- */}
              {userEmail ? (
                // If user is logged in: Show Logout only
                <button 
                  onClick={handleLogout} 
                  style={{ ...navItemStyle, border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Logout
                </button>
              ) : (
                // If user is NOT logged in: Show Sign In AND Join
                <>
                  <Link to="/signin" style={navItemStyle}>Sign In</Link>
                  <Link 
                    to="/signup" 
                    style={{ 
                      ...navItemStyle, 
                      backgroundColor: theme.dark, 
                      color: '#fff', 
                      padding: '10px 25px' 
                    }}
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
            
            <input 
              type="text" placeholder="SEARCH THE COLLECTION..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', border: 'none', borderBottom: '1px solid #ccc', padding: '10px 0', fontSize: '0.7rem', letterSpacing: '2px', textAlign: 'center', outline: 'none', background: 'transparent' }}
            />
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow-1">
          <Routes>
            <Route path='/' element={<Getproducts searchQuery={searchQuery} addToCart={addToCart} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path='/addproducts' element={isAdmin ? <Addproducts /> : <Getproducts searchQuery={searchQuery} addToCart={addToCart} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </main>

        {/* The Lumine Insider */}
        <section style={{ backgroundColor: theme.dark, padding: '70px 0', color: '#fff' }}>
          <div className="container text-center">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px' }}>The Lumine Insider</h3>
            <p style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '2px', marginBottom: '35px' }}>AN EXCLUSIVE INVITATION TO NEW COLLECTION DROPS.</p>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <input 
                type="email" placeholder="ENTER EMAIL ADDRESS" value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', padding: '10px', width: '320px', fontSize: '0.7rem', outline: 'none', letterSpacing: '1px' }} 
              />
              <button onClick={handleSubscribe} style={{ background: 'none', border: 'none', color: theme.accent, fontWeight: '700', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>INVITE ME</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '80px 0 40px 0', borderTop: '1px solid #eee', backgroundColor: theme.footerBg }}>
          <div className="container">
            <div className="row g-4 text-center text-md-start">
              <div className="col-md-4">
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Lumine</h4>
                <p style={{ fontSize: '0.7rem', color: theme.accent, letterSpacing: '2px', fontWeight: '700' }}>UPLIFTING YOUR VALUE</p>
                <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: '1.8' }}>A synergistic partnership curating prestigious collections for the modern visionary.</p>
              </div>
              <div className="col-md-2 offset-md-2">
                <h6 style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Information</h6>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  <li><Link to="/about" style={{ textDecoration: 'none', color: '#666', fontSize: '0.8rem' }}>About Us</Link></li>
                  <li><Link to="/contact" style={{ textDecoration: 'none', color: '#666', fontSize: '0.8rem' }}>Contact</Link></li>
                </ul>
              </div>
              <div className="col-md-2">
                <h6 style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Connect</h6>
                <div className="d-flex justify-content-center justify-content-md-start gap-4">
                  <a href="https://instagram.com" style={{ color: theme.dark }}><i className="fab fa-instagram fa-lg"></i></a>
                  <a href="https://wa.me/254700000000" style={{ color: theme.dark }}><i className="fab fa-whatsapp fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Chat Button */}
        <div onClick={() => setIsChatOpen(!isChatOpen)} style={{ position: 'fixed', bottom: '30px', right: '30px', width: '65px', height: '65px', backgroundColor: theme.dark, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', cursor: 'pointer', zIndex: 1000, border: `1px solid ${theme.accent}` }}>
          <i className="fas fa-comment-alt" style={{ color: theme.accent, fontSize: '1.3rem' }}></i>
        </div>

        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      </div>
    </Router>
  );
}

export default App;