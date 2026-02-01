import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../../constants/contract";
import { fetchMessageStats, postLikeMessage } from "../api/messageApi";

export const useMessageBoard = () => {
  // Chuyển sang mảng để dùng được .map() ở UI
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  /**
   * Đồng bộ dữ liệu từ Blockchain (Nội dung) và Backend (Lượt like)
   */
  const fetchAll = useCallback(async () => {
    if (!window.ethereum) {
      setStatus("Vui lòng cài đặt MetaMask");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider,
      );

      // 1. Đọc dữ liệu On-chain
      // Giả sử Contract trả về tin nhắn cuối hoặc mảng tin nhắn
      const result = await contract.getLastMessage();

      // 2. Đọc dữ liệu Off-chain từ Backend
      const offChainStats = await fetchMessageStats(CONTRACT_ADDRESS);

      // 3. Chuẩn hóa dữ liệu thành Mảng để UI không bị lỗi .map()
      // Chúng ta bọc object vào [ ] để biến nó thành mảng 1 phần tử
      const formattedData = [
        {
          id: CONTRACT_ADDRESS, // Dùng address làm key tạm thời
          sender: result[0],
          content: result[1],
          likes: offChainStats.likes || 0,
        },
      ];

      setMessages(formattedData);
      setStatus("Dữ liệu đã đồng bộ thành công");
    } catch (err) {
      console.error("Critical Error in fetchAll:", err);
      setStatus("Lỗi kết nối hệ thống, vui lòng thử lại");
      setMessages([]); // Trả về mảng rỗng để tránh crash UI
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Gửi tin nhắn mới lên Blockchain
   */
  const handleSend = async (text) => {
    if (!text) return;
    setLoading(true);
    setStatus("Đang chờ xác nhận giao dịch...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );

      const tx = await contract.postMessage(text);
      setStatus("Giao dịch đang được xử lý...");
      await tx.wait(); // Đợi Block được đào xong

      setStatus("Giao dịch thành công!");
      await fetchAll(); // Refresh lại danh sách
    } catch (err) {
      console.error("Transaction Error:", err);
      setStatus("Giao dịch thất bại hoặc bạn đã từ chối");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Like tin nhắn (Lưu vào Backend thông qua JWT)
   */
  const handleLike = async () => {
    try {
      const result = await postLikeMessage(CONTRACT_ADDRESS);
      if (result.success) {
        // Cập nhật lượt like trong mảng messages một cách tối ưu (Immutable update)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === CONTRACT_ADDRESS ? { ...msg, likes: result.likes } : msg,
          ),
        );
      }
    } catch (err) {
      console.error("Like Error:", err.message);
      // Bạn có thể thêm Toast thông báo lỗi ở đây
    }
  };

  return { messages, loading, status, handleSend, handleLike, fetchAll };
};
