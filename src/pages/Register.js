import RegisterForm from "../components/RegisterForm";
import Video from "../components/Home/Video";

import "./Register.css";

export default function Register() {
  return (
    <>
      <Video />
      <div className="register-container">
        <div className="register-form">
          <h1>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}