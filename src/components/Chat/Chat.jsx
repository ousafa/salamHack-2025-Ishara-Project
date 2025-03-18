import React, { useState } from "react";
import "./Chat.css";
import Disclaimer from "../Disclaimer/Disclaimer";
import Together from "together-ai";

const Chat = ({ msg, setMsg }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (image) {
      await handleImageUpload();
    } else {
      await handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { user: "You", text: input };
    setMsg((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setInput("");

    try {
      const response = await getMedicalSuggestion(input);
      const botMessage = { user: "bot", text: response };
      setMsg((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.log("API Error:", error);
      setMsg((prevMessages) => [
        ...prevMessages,
        { user: "bot", text: "Sorry, I couldn't fetch a response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const newMessage = {
      user: "You",
      text: "Image uploaded",
      image: URL.createObjectURL(image),
    };
    setMsg((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setImage(null);
    setImagePreview(null); // Clear the preview after sending

    try {
      const formData = new FormData();
      formData.append("file", image);
      console.log(formData);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const extractedText = data.extractedText;
      console.log(extractedText);

      const aiResponse = await getMedicalSuggestion(extractedText);
      const botMessage = { user: "bot", text: aiResponse };
      setMsg((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.log("API Error:", error);
      setMsg((prevMessages) => [
        ...prevMessages,
        { user: "bot", text: "Sorry, I couldn't fetch a response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set the preview URL
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="messages">
          {msg.map((message, index) => (
            <div
              key={index}
              className={`message ${message.user === "bot" ? "bot" : "user"}`}
            >
              <strong
                style={{ textAlign: message.user === "bot" ? "left" : "right" }}
              >
                {message.user}
              </strong>
              {message.image ? (
                <img
                  src={message.image}
                  alt="Uploaded"
                  style={{ maxWidth: "100%" }}
                  className="upImg"
                />
              ) : (
                <p
                  style={{
                    textAlign: message.user === "bot" ? "left" : "right",
                  }}
                >
                  {message.text}
                </p>
              )}
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
              placeholder="Enter your symptom"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="textInput"
            />

            <input
              type="file"
              accept="image/*"
              name="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="btn uploadBtn">
              Upload image
            </label>
            <button type="submit" className="btn sendBtn btn-info">
              Send
            </button>
          </form>
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}
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
