import "./user-type-selection.css";

type UserTypeSelectionType = {
  setUserRole: (role: string) => void;
}

const UserTypeSelection = ({ setUserRole }: UserTypeSelectionType) => {
  return (
    <section className="user-selection">
      <h2>Crie uma conta gratuita</h2>
      <div className="user-options" onClick={() => setUserRole("Patient")}>
        <div className="user-card">
          <div className="user-icon">🦷</div>
          <h3>Sou um paciente</h3>
          <p>Agende consultas e encontre os melhores profissionais perto de você.</p>
        </div>

        <div className="user-card" onClick={() => setUserRole("Dentist")}>
          <div className="user-icon">🩺</div>
          <h3>Sou um dentista</h3>
          <p>Cadastre-se para receber agendamentos e gerenciar sua agenda.</p>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelection;