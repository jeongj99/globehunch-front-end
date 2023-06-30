import LoginForm from "../components/LoginForm";
import Video from "../components/Home/Video";

import "./Login.css";

export default function Login() {
  return (
    <>
      <Video />
      <div className="login-container">
        <div className="login-form">
          <h1>Log In</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
}