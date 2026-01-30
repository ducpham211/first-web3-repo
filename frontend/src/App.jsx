import { useMessageBoard } from "./features/message-board/hooks/useMessageBoard";
import { useEffect } from "react";

function App() {
  const { data, loading, handleSend, handleLike, fetchAll } = useMessageBoard();

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <header>
        <h1>DApp Message Board v2</h1>
      </header>

      <main>
        {/* Phần hiển thị tin nhắn On-chain */}
        <section
          style={{
            border: "1px solid #444",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontStyle: "italic" }}>
            "{data.content || "Đang tải..."}"
          </p>
          <small>Người gửi: {data.sender}</small>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleLike}>
              ❤️ {data.likes} Likes (Off-chain)
            </button>
          </div>
        </section>

        {/* Phần tương tác gửi tin */}
        <section style={{ marginTop: "2rem" }}>
          <input id="msgInput" placeholder="Nhập tin nhắn On-chain..." />
          <button
            disabled={loading}
            onClick={() =>
              handleSend(document.getElementById("msgInput").value)
            }
          >
            {loading ? "Đang xác nhận..." : "Gửi lên Blockchain"}
          </button>
        </section>
      </main>
    </div>
  );
}
export default App;
