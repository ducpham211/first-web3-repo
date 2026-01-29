import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants/contract";

function App() {
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // 1. Yêu cầu kết nối ví MetaMask [cite: 19]
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setStatus("Đã kết nối ví thành công!");
      } catch (error) {
        setStatus("Người dùng từ chối kết nối."); // Xử lý lỗi phổ biến [cite: 23]
        console.error("Lỗi kết nối ví:", error);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask!");
    }
  };

  // 2. Đọc dữ liệu từ Smart Contract [cite: 20]
  const fetchMessage = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider,
    );

    try {
      const data = await contract.getLastMessage();
      setCurrentMessage(data[1]); // Lấy nội dung message
    } catch (err) {
      console.error("Lỗi khi đọc dữ liệu:", err);
    }
  };

  // 3. Gửi giao dịch lên Blockchain [cite: 21]
  const sendMessage = async () => {
    if (!message || !account) return;
    setLoading(true);
    setStatus("Đang chờ xác nhận từ ví...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );

      const tx = await contract.postMessage(message);
      setStatus("Giao dịch đã gửi. Đang chờ xác nhận trên mạng (Pending)..."); // [cite: 22]

      await tx.wait(); // Chờ đào block
      setStatus("Giao dịch thành công!");
      fetchMessage(); // Cập nhật lại UI
    } catch (error) {
      // Xử lý các tình huống lỗi RPC hoặc người dùng từ chối [cite: 23]
      setStatus("Giao dịch thất bại: " + (error.reason || "Lỗi mạng/Từ chối"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={{ padding: "50px", fontFamily: "Arial" }}>
      <h1>IE213 - Blockchain Project</h1>
      <button onClick={connectWallet}>
        {account
          ? `Ví: ${account.substring(0, 6)}...${account.substring(38)}`
          : "Kết nối MetaMask"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Tin nhắn On-chain hiện tại:</h3>
        <p style={{ fontSize: "20px", color: "blue" }}>
          {currentMessage || "Chưa có dữ liệu"}
        </p>
      </div>

      <hr />

      <input
        type="text"
        placeholder="Nhập tin nhắn mới..."
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Đang xử lý..." : "Gửi lên Blockchain"}
      </button>

      <p>
        <strong>Trạng thái:</strong> {status}
      </p>
    </div>
  );
}

export default App;
