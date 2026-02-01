import { useState } from "react";
import { ethers } from "ethers";
import { useAuthContext } from "../context/AuthContext";
import { getNonce, verifySignature } from "../api/authApi";

export const useAuth = () => {
  const { token, updateToken, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!window.ethereum) throw new Error("Vui lòng cài đặt MetaMask!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // BƯỚC 1: Lấy mã Nonce (Atomic Flow - không ngắt quãng)
      const { nonce } = await getNonce(address);

      // BƯỚC 2: Ký Signature (MetaMask sẽ hiện Popup ngay sau khi lấy xong Nonce)
      const signature = await signer.signMessage(nonce);

      // BƯỚC 3: Xác thực và lấy Token
      const { token: jwtToken } = await verifySignature({
        address,
        nonce,
        signature,
      });

      // BƯỚC 4: Cập nhật vào Context để toàn bộ App cùng biết
      updateToken(jwtToken);
    } catch (err) {
      console.error("Lỗi xác thực:", err);
      // Áp dụng khối try-catch để dễ debug theo yêu cầu của Leader
      setError(err.error || err.message || "Xác thực thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { token, login, logout, loading, error };
};
