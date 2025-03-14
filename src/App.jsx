import Header from "./components/header/Header";
import Main from "./components/main/Main";
import ChatInput from "./components/chat-input/ChatInput";
import Disclaimer from "./components/disclaimer/Disclaimer";
import Footer from "./components/footer/Footer";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
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
  );
}

export default App;
