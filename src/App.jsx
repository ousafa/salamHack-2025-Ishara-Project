import Header from "./components/header/Header";
import Main from "./components/main/Main";
import ChatInput from "./components/chat-input/ChatInput";
import Disclaimer from "./components/disclaimer/Disclaimer";
import Footer from "./components/footer/Footer";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { useState } from "react";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMain, setShowMain] = useState(true);

  const [msg, setMsg] = useState([]); // Store chat messages

  const handleNewChat = () => {
    setMsg([]); // Clear chat messages
    setIsChatOpen(true); // Keep chat open
    setShowMain(false); // Hide main content
  };



  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{ height: "100vh" }}
    >
      <Header
        newChatButton={
          isChatOpen && (
            <button className="btn btn-info" onClick={handleNewChat}>   
              New Chat
            </button>
          )
        }
      />
      {showMain && <Main />}
      {isChatOpen ? (
        <Chat msg={msg} setMsg={setMsg} />
      ) : (
        <button
          type="button"
          className="btn btn-outline-info fs-4 fw-medium text-black"
          onClick={() => {
            setIsChatOpen(true);
            setShowMain(false);
          }}
        >
          Get Started
        </button>
      )}
      <Footer />
    </div>
  );
}

export default App;
