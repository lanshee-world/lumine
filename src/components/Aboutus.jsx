import React from 'react';

const Aboutus = () => {
    const theme = {
        accent: "#b8924e",
        dark: "#1a1a1a",
        lightBg: "#fdfdfb",
        gray: "#f4f4f4"
    };

    return (
        <div style={{ backgroundColor: theme.lightBg, paddingTop: '100px' }}>
            {/* HERO SECTION - Office Building / Architectural feel */}
            <div className="container-fluid p-0 mb-5">
                <div style={{ 
                    height: '400px', 
                    width: '100%', 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")', // Luxury Office Exterior
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '40px', width: '100%', textAlign: 'center' }}>
                        <h1 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", letterSpacing: '10px', textTransform: 'uppercase' }}>Our Headquarters</h1>
                    </div>
                </div>
            </div>

            {/* PARTNERSHIP SECTION - Image Beside Text */}
            <div className="container my-5 py-5">
                <div className="row align-items-center">
                    {/* Office Interior Image */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" // Modern Office Interior
                            alt="Lumine Office Interior" 
                            className="img-fluid shadow-lg"
                            style={{ borderRadius: '2px', borderLeft: `8px solid ${theme.accent}` }}
                        />
                    </div>
                    
                    {/* Partnership Text */}
                    <div className="col-md-6 ps-md-5">
                        <h6 style={{ color: theme.accent, letterSpacing: '3px', fontWeight: '700', textTransform: 'uppercase' }}>
                            <i className="fas fa-handshake me-2"></i> Strategic Partnership
                        </h6>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '25px', color: theme.dark }}>
                            A standard of excellence in Nairobi.
                        </h2>
                        <p style={{ color: '#666', lineHeight: '1.8', fontSize: '0.95rem' }}>
                            Lumine operates at the intersection of prestige and innovation. Our workspace is designed 
                            to foster the synergistic partnerships that define our brand. Every interaction within 
                            these walls is an investment in the modern visionary.
                        </p>
                        <div className="d-flex gap-4 mt-4">
                            <div className="text-center">
                                <i className="fas fa-gem mb-2" style={{ color: theme.accent, fontSize: '1.5rem' }}></i>
                                <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase' }}>Premium</p>
                            </div>
                            <div className="text-center">
                                <i className="fas fa-globe mb-2" style={{ color: theme.accent, fontSize: '1.5rem' }}></i>
                                <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase' }}>Global</p>
                            </div>
                            <div className="text-center">
                                <i className="fas fa-crown mb-2" style={{ color: theme.accent, fontSize: '1.5rem' }}></i>
                                <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase' }}>Exclusive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SYMBOLS/VALUES SECTION */}
            <div style={{ backgroundColor: theme.dark, color: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="fas fa-shield-alt mb-3" style={{ fontSize: '2rem', color: theme.accent }}></i>
                            <h5 style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Integrity</h5>
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>Unwavering commitment to quality.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-chart-line mb-3" style={{ fontSize: '2rem', color: theme.accent }}></i>
                            <h5 style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Growth</h5>
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>Uplifting the value of our community.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-eye mb-3" style={{ fontSize: '2rem', color: theme.accent }}></i>
                            <h5 style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Vision</h5>
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>Leading the market with prestige.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;