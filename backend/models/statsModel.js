import { supabase } from "../config/supabase.js";
export const StatsModel = {
  // Lấy thông tin từ DB dựa trên địa chỉ Contract
  async findByAddress(contractAddress) {
    try {
      const { data, error } = await supabase
        .from("message_stats")
        .select("*")
        .eq("id", contractAddress)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    } catch (error) {
      console.error("Lỗi thật từ Supabase:", error); // Dòng này sẽ hiện lỗi chi tiết ở Terminal
      throw new Error("Lỗi Model: Không thể truy vấn database.");
    }
  },

  // Tăng lượt like
  async updateLikes(contractAddress) {
    try {
      const { data, error } = await supabase.rpc("increment_likes", {
        row_id: contractAddress,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error("Lỗi Model: Không thể cập nhật lượt Like.");
    }
  },
};
