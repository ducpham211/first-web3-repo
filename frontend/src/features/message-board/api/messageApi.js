import axios from "axios";

// Lấy URL từ file .env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchMessageStats = async (contractAddress) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/stats/${contractAddress}`,
    );
    console.log("Dữ liệu stats từ API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi fetch stats:", error);
    // Trả về lỗi theo đúng cấu trúc Axios để Hook xử lý
    throw new Error(
      error.response?.data?.error || "Không thể tải dữ liệu từ server",
    );
  }
};

export const postLikeMessage = async (contractAddress) => {
  try {
    const response = await axios.post(`${API_URL}/api/stats/like`, {
      contractAddress,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi like:", error);
    throw new Error(error.response?.data?.error || "Lỗi tương tác hệ thống");
  }
};
