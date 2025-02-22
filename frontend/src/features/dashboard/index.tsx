import { useCheckProfileCompletion } from "../auth/hooks/use-check-profile-completion";

const Dashboard = () => {
  useCheckProfileCompletion()
  return (
    <div>
      <h1>Bem-vindo ao Dashboard</h1>
      <p>Você está autenticado!</p>
    </div>
  );
};

export default Dashboard;