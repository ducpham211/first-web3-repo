import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Hàm cập nhật token cho toàn bộ hệ thống
  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      navigate("/home"); // Chuyển trang ngay khi có vé thông hành
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để các component con lấy dữ liệu từ Context
export const useAuthContext = () => useContext(AuthContext);
