import jwt from "jsonwebtoken";

/**
 * Middleware bảo vệ các Route yêu cầu đăng nhập
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Kiểm tra xem Token có nằm trong header Authorization không
    // Định dạng chuẩn: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Bạn chưa đăng nhập. Vui lòng kết nối ví và ký xác thực.",
      });
    }

    // 2. Xác thực Token (Verify)
    // JWT sẽ giải mã và trả về payload (chứa address) mà chúng ta đã ký ở Controller
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Gán thông tin người dùng vào request để các hàm sau (Controller) có thể sử dụng
    req.user = {
      address: decoded.address,
    };

    // Cho phép request đi tiếp tới Controller
    next();
  } catch (err) {
    console.error("Lỗi Middleware Auth:", err.message);

    // Phân loại lỗi JWT để phản hồi cụ thể cho Frontend
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          success: false,
          error: "Phiên đăng nhập đã hết hạn, vui lòng ký lại.",
        });
    }

    res
      .status(401)
      .json({
        success: false,
        error: "Token không hợp lệ hoặc đã bị giả mạo.",
      });
  }
};
