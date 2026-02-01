import { supabase } from "../config/supabase.js";

const UserModel = {
  upsertNonce: async (address, nonce) => {
    const { error } = await supabase
      .from("user_nonces")
      .upsert({ id: address.toLowerCase(), nonce });
    return { error };
  },
};
export default UserModel;
