import axiosClient from "../../services/axiosClient";

export const fetchMessageStats = async (contractAddress) => {
  try {
    // Không cần config headers ở đây nữa, Interceptor đã lo hết!
    const response = await axiosClient.post(`/api/v1/stats/like`, {
      contractAddress,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Lỗi tương tác hệ thống");
  }
};

export const postLikeMessage = async (contractAddress) => {
  try {
    // Không cần config headers ở đây nữa, Interceptor đã lo hết!
    const response = await axiosClient.post(`/api/v1/stats/like`, {
      contractAddress,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Lỗi tương tác hệ thống");
  }
};
//messageApi.js
