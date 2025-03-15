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
  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{ height: "100vh" }}
    >
      <Header />
      <Main />
      {isChatOpen ? (
        <Chat />
      ) : (
        <button type="button" class="btn btn-outline-info  fs-4 fw-medium text-black" onClick={() => setIsChatOpen(true)}>
          Get Started
        </button>
      )}
      <Footer />
    </div>
  );
  /*const [open, setOpen] = useState(false);
  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <Main />

      {open && <Chat />}
      {open === false && (
        <button onClick={() => setOpen(true)}>Get Started</button>
      )}

      <Footer />
    </div>
  );*/ //
}

export default App;
