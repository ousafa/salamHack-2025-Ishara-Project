import React, { useState } from "react";
import "./Chat.css";
import Disclaimer from "../Disclaimer/Disclaimer";
import Together from "together-ai";

const Chat = ({ msg, setMsg }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSendMessage();
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { user: "You", text: input };
    setMsg((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setInput("");

    try {
      const response = await getMedicalSuggestion(input);
      const botMessage = { user: "Ishara", text: response };
      setMsg((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.log("API Error:", error);
      setMsg((prevMessages) => [
        ...prevMessages,
        { user: "Ishara", text: "Sorry, I couldn't fetch a response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="messages">
          {msg.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.user === "Ishara" ? "bot" : "user"
              }`}
            >
              <strong
                style={{
                  textAlign: message.user === "Ishara" ? "left" : "right",
                }}
              >
                q{message.user}
              </strong>
              <p
                style={{
                  textAlign: message.user === "Ishara" ? "left" : "right",
                }}
              >
                {message.text}
              </p>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <strong style={{ textAlign: "left" }}>Ishara</strong>
              <p style={{ textAlign: "left" }}>Loading...</p>
            </div>
          )}
        </div>
        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className="btn uploadBtn">
              Upload image
            </button>
            <button type="submit" className="btn btn-info sendBtn">
              Send
            </button>
          </form>
        </div>
      </div>
      <Disclaimer />
    </>
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
                    - A possible cause or condition associated with the symptom.
                    - Practical advice (home remedies, precautions).
                    - When to consult a doctor.
                    - Keep it short and informative.`,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("API Error:", error);
    return "An error occurred while processing your request. Please try again later.";
  }
};
