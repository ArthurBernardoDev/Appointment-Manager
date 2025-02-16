import { useState } from "react";
import UserTypeSelection from "./components/UserTypeSelection";
import RegisterPage from "./Pages/RegisterPage";

const Register = () => {
  const [user, setUser] = useState({ role: "" });

  const setUserRole = (role: string) => {
    setUser((prevUser) => ({ ...prevUser, role }));
  };

  console.log("user", user);

  return (
    <div>
      {user.role === "" ? (
        <UserTypeSelection setUserRole={setUserRole} />
      ) : (
        <RegisterPage />
      )}
    </div>
  );
};

export default Register;
