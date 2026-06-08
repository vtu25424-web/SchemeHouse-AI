import { useState } from "react";
import axios from "axios";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/recommendations/api/recommendations/chat",
        {
          message,
        }
      );

      setReply(res.data.reply);
    } catch (error) {
      console.error(error);

      setReply("Unable to get response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <h2>SchemeHouse AI Assistant</h2>

      <textarea
        rows="4"
        placeholder="Describe yourself..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Ask AI
      </button>

      {loading && <p>Thinking...</p>}

      {reply && (
        <div className="chat-response">
          <h3>Response</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default ChatBox;