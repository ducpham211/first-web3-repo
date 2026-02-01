import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";

const LoginPage = () => {
  const { login, loading, error } = useAuth();

  return (
    <div
      className="login-container"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <h1>Web3 Message Board</h1>
      <p>Hệ thống yêu cầu xác thực ví để tiếp tục</p>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <button
        onClick={login}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Đang xử lý (Vui lòng ký ví)..." : "Kết nối & Đăng nhập"}
      </button>

      {loading && (
        <p style={{ fontStyle: "italic", fontSize: "0.9em" }}>
          Mở MetaMask để hoàn thành bước ký xác thực.
        </p>
      )}
    </div>
  );
};

export default LoginPage;
