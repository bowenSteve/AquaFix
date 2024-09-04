import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer text-light">
      <div className="container">
        <div className="row">
          {/* AquaFix Ltd Section */}
          <div className="col-md-4">
            <h5 className="footer-title">AquaFix Ltd</h5>
            <p>123 Water St., Nairobi, Kenya</p>
            <p>Phone: +254 712 345 678</p>
            <p>Email: info@aquafix.co.ke</p>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-4">
            <h5 className="footer-title">Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="footer-link text-color">Home</a></li>
              <li><a href="#about" className="footer-link text-color">About Us</a></li>
              <li><a href="#services" className="footer-link text-color">Services</a></li>
              <li><a href="#contact" className="footer-link text-color">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links Section */}
          <div className="col-md-4">
            <h5 className="footer-title">Follow Us</h5>
            <a href="https://www.facebook.com" className="footer-link me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="footer-link me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="footer-link me-3">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <p className="mb-0 mt-5">&copy; 2024 AquaFix Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
