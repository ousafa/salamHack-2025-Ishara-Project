import React, { useEffect, useState } from "react";
import "./Chat.css";
import Together from "together-ai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setInput("");
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { text: input };
    setMessages([...messages, newMessage]);
    setLoading(true);

    const response = await getMedicalSuggestion(input);

    const botMessage = { user: "bot", text: response };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLoading(false);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            {msg.user === "bot" ? (
              <>
                <strong style={{ textAlign: "left" }}>Ishara </strong>
                <p style={{ textAlign: "left" }}>{msg.text}</p>
              </>
            ) : (
              <>
                <strong style={{ textAlign: "right" }}>You </strong>
                <p style={{ textAlign: "right" }}>{msg.text}</p>
              </>
            )}
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <strong style={{ textAlign: "left" }}>Ishara </strong>
            <p style={{ textAlign: "left" }}>Loading...</p>
          </div>
        )}
      </div>
      <div className="input-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="btn btn-info sendBtn" onClick={handleSendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

const getMedicalSuggestion = async (symptom) => {
  const together = new Together({
    apiKey: import.meta.env.VITE_API_KEY,
  });
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `The user has entered the symptom: ${symptom}. Provide a professional medical suggestion based on this symptom. Include:
                              A possible cause or condition associated with the symptom.
                              Practical advice on what the user can do (home remedies, lifestyle changes, precautions).
                              Whether the user should consult a doctor and under what conditions.
                              A clear and concise explanation in simple terms for better understanding.
                              Keep the response short, direct, and informative.`,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    return response.choices[0].message.content;
  } catch (error) {
    return { error: "An error occurred while processing your request." };
  }
};
