import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [sidebarExtended, setSidebarExtended] = useState(false);
   const [darkMode, setDarkMode] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
   const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img
            className="menu"
            src={assets.menu_icon}
            alt="MenuIcon"
            onClick={() => setSidebarExtended((previous) => !previous)}
          />
          <div
            onClick={() => {
              newChat();
            }}
            className="new-chat"
          >
            <img src={assets.plus_icon} alt="" />
            {sidebarExtended ? <p>New Chat</p> : null}
          </div>
          {sidebarExtended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      loadPrompt(item);
                    }}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="MessageIcon" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <button
  className="dark-mode-toggle"
  onClick={toggleDarkMode}
  style={{
    margin: "20px 0",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    background: darkMode ? "#222" : "#eee",
    color: darkMode ? "#fff" : "#222",
    cursor: "pointer",
    width: "100%",
  }}
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="QuestionIcon" />
            {sidebarExtended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="HistoryIcon" />
            {sidebarExtended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="SettingIcon" />
            {sidebarExtended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
