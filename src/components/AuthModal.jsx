import { useState } from "react";
import "../styles.css";

const AuthModal = ({ isVisible, onClose, isLogin, toggleAuthMode, onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(); // Authentication logic here
  };

  if (!isVisible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <div className="container">
          <div className="heading">{isLogin ? "WELCOME BACK" : "SIGN UP"}</div>
          <div className="sub-heading">
            {isLogin ? "Log into your account" : "Create an account"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a preferred username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Login now" : "Continue"}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? (
            <div onClick={toggleAuthMode}>
              Not registered yet? <a>Register →</a>
            </div>
          ) : (
            <div onClick={toggleAuthMode}>
              Already have an account? <a>Login →</a>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
