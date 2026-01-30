import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../../constants/contract";
import { fetchMessageStats, postLikeMessage } from "../api/messageApi";

export const useMessageBoard = () => {
  const [data, setData] = useState({ content: "", sender: "", likes: 0 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const fetchAll = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      // 1. Đọc On-chain: Lấy nội dung tin nhắn
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider,
      );
      const onChainMsg = await contract.getLastMessage();

      // 2. Đọc Off-chain: Lấy lượt like từ Backend
      const offChainStats = await fetchMessageStats(CONTRACT_ADDRESS);

      setData({
        sender: onChainMsg[0],
        content: onChainMsg[1],
        likes: offChainStats.likes || 0,
      });
      setStatus("Dữ liệu đã được đồng bộ");
    } catch (err) {
      console.error("Lỗi đồng bộ:", err);
      setStatus("Lỗi kết nối hệ thống");
    }
  }, []);

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
      await tx.wait(); // Chờ đào block

      setStatus("Giao dịch thành công!");
      await fetchAll(); // Tải lại dữ liệu mới
    } catch (err) {
      setStatus("Giao dịch bị từ chối hoặc lỗi mạng");
      console.error("Lỗi gửi tin nhắn:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const result = await postLikeMessage(CONTRACT_ADDRESS);
      if (result.success) {
        setData((prev) => ({ ...prev, likes: result.likes }));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return { data, loading, status, handleSend, handleLike, fetchAll };
};
