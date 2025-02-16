import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="link"><h1 className="logo">Sorriso+</h1></Link>
      <nav className="nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Doctors</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <div>
        <Link to={'/register'}>
        <button className="live-chat">Criar perfil gratuito</button>
        </Link>
        <button className="live-chat">Entrar</button>
      </div>
    </header>
  );
};

export default Header;