import React, { useState, useEffect } from 'react'; // Import useEffect
import './footer.css';
import { Helmet } from 'react-helmet';
const Footer = () => {
    return (
      <div>
            <Helmet>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossorigin
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
        <div className="footer">
        <div className='text' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: Adrien Ardra Ramadhan
      </div>
        </div>
      </div>
    );
  }
  
  export default Footer;
  