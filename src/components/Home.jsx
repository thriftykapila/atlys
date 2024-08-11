import { useState } from "react";
import { postsData } from "../postsData.constants";
import "../styles.css";
import AuthModal from "./AuthModal";
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

  const toggleAuthMode = () => setLoginModal(!isLoginModal);
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-mode", !isLightMode);
  };
  return (
    <div className={`home-container ${isLightMode ? "light-mode" : ""}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Hello Jane</h1>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isLightMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      <p>
        How are you doing today? Would you like to share something with the
        community 🤗
      </p>
      <div
        className={`create-post ${isLightMode ? "light-mode" : ""}`}
        onClick={handlePostClick}
      >
        <div>Create post</div>
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
          <div className="outer-post">
            <button className="post-btn">Post</button>
          </div>
        </form>
      </div>
      <div className="feed">
        {postsData.map((post, index) => (
          <div className="post" key={index}>
            <img
              src="https://via.placeholder.com/40"
              alt="User avatar"
              className="avatar"
            />
            <div className="post-content">
              <div className="post-header">
                <h4>{post.name}</h4>
                <span className="post-time">{post.time}</span>
              </div>
              <p>{post.content}</p>
              <div className="post-footer">
                <span className="comments">{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AuthModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        isLogin={isLoginModal}
        toggleAuthMode={toggleAuthMode}
        onAuth={handleCloseModal}
      />
    </div>
  );
};

export default Home;
