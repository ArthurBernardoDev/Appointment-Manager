import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="link">
        <h1 className="logo">Sorriso+</h1>
      </Link>
      <div>
        <Link to={"/sign-out"}>
          <button className="live-chat">Criar perfil gratuito</button>
        </Link>
        <Link to="/sign-in" className="link">
          <button className="live-chat">Entrar</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
