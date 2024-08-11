import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles.css";

// Login Modal Component
const AuthModal = ({ isVisible, onClose, isLogin, onAuth }) => {
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
        <h3>{isLogin ? "WELCOME BACK" : "SIGN UP"}</h3>
        <h2>{isLogin ? "Log into your account" : "Create an account"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
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
              placeholder="Enter your password"
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
            <>
              Not registered yet?{" "}
              <a href="#register" onClick={onClose}>
                Register →
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#login" onClick={onClose}>
                Login →
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

// Home Component
const Home = ({ onLogout }) => {
  const [newPost, setNewPost] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoginModal, setLoginModal] = useState(true);

  const handlePostClick = () => setModalVisible(true);

  const handleCloseModal = () => setModalVisible(false);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setNewPost("");
  };

  return (
    <div className="home-container">
      <h1>Hello Jane</h1>
      <p>
        How are you doing today? Would you like to share something with the
        community 🤗
      </p>
      <div className="create-post" onClick={handlePostClick}>
        <h3>Create post</h3>
        <form onSubmit={handlePostSubmit}>
          <div className="post-input">
            <span className="chat-icon">💬</span>
            <input
              type="text"
              placeholder="How are you feeling today?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              disabled
            />
          </div>
        </form>
      </div>
      <div className="feed">
        {/* Sample post */}
        <div className="post">
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            className="avatar"
          />
          <div className="post-content">
            <div className="post-header">
              <h4>Theresa Webb</h4>
              <span className="post-time">5mins ago</span>
            </div>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <div className="post-footer">
              <span className="comments">24 comments</span>
            </div>
          </div>
        </div>
        {/* Add more posts here */}
      </div>

      <AuthModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        isLogin={isLoginModal}
        onAuth={handleCloseModal}
      />
    </div>
  );
};

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
