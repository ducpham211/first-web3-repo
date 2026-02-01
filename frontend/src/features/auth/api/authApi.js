import axiosClient from "../../services/axiosClient";

export const getNonce = async (address) => {
  try {
    const response = await axiosClient.post(`/api/v1/auth/nonce`, {
      address,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifySignature = async (authData) => {
  try {
    const response = await axiosClient.post(`/api/v1/auth/verify`, authData);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
//authApi.js
