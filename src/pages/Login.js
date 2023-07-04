import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Video from "../components/Home/Video";

import "./Login.css";

export default function Login() {
  return (
    <>
      <Navbar />
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