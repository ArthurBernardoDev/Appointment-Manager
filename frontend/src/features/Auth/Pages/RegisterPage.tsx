import './RegisterPage.css';

function RegisterPage() {
  return (
    <div className="signup-container">
      {/* Logo / Título */}
      <h1 className="logo">Doctoralia</h1>
      <h2>Crie uma conta</h2>

      {/* Botões de login social */}
      <button className="social-button google-button">Continuar com Google</button>
      <button className="social-button apple-button">Continuar com a Apple</button>

      {/* Separador */}
      <div className="separator">
        <span>ou</span>
      </div>

      {/* Formulário */}
      <form>
        <label htmlFor="email">Seu e-mail</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Seu e-mail" 
          required 
        />

        <label htmlFor="verifyEmail">Verifique seu e-mail</label>
        <input 
          id="verifyEmail" 
          type="email" 
          placeholder="Verifique seu e-mail" 
          required 
        />

        {/* Checkboxes */}
        <div className="checkbox-group">
          <label>
            <input type="checkbox" />
            {' '}Autorizo a Doctoralia processar meus dados com a finalidade de usar os serviços da Doctoralia (mais info)
          </label>
          <label>
            <input type="checkbox" />
            {' '}Aceito receber comunicações comerciais da Doctoralia (opcional)
          </label>
        </div>

        {/* Botão de criação de conta */}
        <button type="submit" className="create-button">
          Criar perfil gratuito
        </button>

        {/* Textos de rodapé */}
        <p className="terms">
          Ao se registrar, você está de acordo com os{' '}
          <a href="#">Termos de Serviço</a> e a{' '}
          <a href="#">Política de Privacidade</a>.
        </p>

        <p className="login-redirect">
          Para continuar, inicie a sessão com sua conta Doctoralia.com.br.{' '}
          <a href="#">Faça login em sua conta</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;