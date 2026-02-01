import React, { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useMessageBoard } from "../hooks/useMessageBoard";

const MessageBoardPage = () => {
  const { logout, address } = useAuth();
  const { messages, fetchAll, handleSend, handleLike } = useMessageBoard();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="home-container">
      <header>
        <span>Ví: {address}</span>
        <button onClick={logout}>Đăng xuất</button>
      </header>

      <section className="input-section">
        <input type="text" id="msgInput" placeholder="Nhập tin nhắn..." />
        <button
          onClick={() => handleSend(document.getElementById("msgInput").value)}
        >
          Gửi lên Blockchain
        </button>
      </section>

      <section className="messages-list">
        {messages.map((msg, i) => (
          <div key={i} className="message-card">
            <p>{msg.content}</p>
            <small>Từ: {msg.sender}</small>
            <button onClick={() => handleLike(msg.contractId)}>
              ❤️ {msg.likes || 0}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MessageBoardPage;
