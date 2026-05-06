import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5 mt-5" style={{ minHeight: '70vh', fontFamily: "'Playfair Display', serif" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <p style={{ color: '#b8924e', letterSpacing: '4px', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase' }}>Get in Touch</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Let's Start a Conversation</h1>
          
          <div className="mb-5">
            <h5 style={{ fontSize: '0.9rem', fontWeight: '700', letterSpacing: '1px' }}>EMAIL ENQUIRIES</h5>
            <p style={{ fontFamily: 'sans-serif', color: '#666' }}>concierge@lumine.com</p>
          </div>

          <div className="mb-5">
            <h5 style={{ fontSize: '0.9rem', fontWeight: '700', letterSpacing: '1px' }}>PHONE & WHATSAPP</h5>
            <p style={{ fontFamily: 'sans-serif', color: '#666' }}>+254 700 000 000</p>
          </div>

          <div style={{ borderTop: '1px solid #f2f2f2', paddingTop: '30px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>
              Our concierge team is available Monday through Friday to assist with your collection selections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;