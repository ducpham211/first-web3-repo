import { StatsModel } from "../models/statsModel.js";
export const getStats = async (req, res) => {
  try {
    const { contractAddress } = req.params;
    const data = await StatsModel.findByAddress(contractAddress);

    // Nếu chưa có dữ liệu, trả về cấu trúc mặc định
    res.status(200).json(data || { id: contractAddress, likes: 0 });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const handleLike = async (req, res) => {
  try {
    const { contractAddress } = req.body;
    const newLikes = await StatsModel.updateLikes(contractAddress);
    res.status(200).json({ success: true, likes: newLikes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
