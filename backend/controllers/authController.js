import { ethers } from "ethers";

import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

export const getNonce = async (req, res) => {
  const { address } = req.body;

  if (!address) return res.status(400).json({ error: "Thiếu địa chỉ ví" });

  const nonce = `Xác thực quyền sở hữu ví. Mã bảo mật: ${Math.floor(Math.random() * 1000000)}`;

  const { error } = await UserModel.upsertNonce(address, nonce);

  if (error) return res.status(500).json({ error: "Lỗi lưu mã nonce" });

  res.json({ success: true, nonce });
};

export const verifySignature = async (req, res) => {
  const { address, signature, nonce } = req.body;
  try {
    const recoveredAddress = ethers.verifyMessage(nonce, signature);

    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      const token = jwt.sign(
        { address: address.toLowerCase() },

        process.env.JWT_SECRET,

        { expiresIn: "1d" },
      );

      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: "Chữ ký không khớp" });
    }
  } catch (err) {
    res.status(500).json({ error: "Lỗi xác thực chữ ký" });
  }
};
