import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">Sorriso+</div>
        <nav className="footer-nav">
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Profissionais</a>
          <a href="#">Contato</a>
        </nav>
        <p className="footer-text">© 2025 Sorriso+. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;