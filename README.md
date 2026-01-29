📝 Decentralized Message Board (DApp) - Research Milestone #1
Dự án này là bước nghiên cứu nền tảng về ứng dụng phi tập trung (dApp), thực hiện trong khuôn khổ đồ án môn học IE213. Hệ thống cho phép người dùng tương tác với Smart Contract trên mạng Ethereum Sepolia để lưu trữ và hiển thị tin nhắn một cách minh bạch.

🚀 Tính năng nổi bật

Kết nối ví Web3: Tích hợp MetaMask để xác thực người dùng thông qua địa chỉ ví.

Tương tác On-chain: Đọc dữ liệu trực tiếp từ Smart Contract và gửi giao dịch thay đổi trạng thái chuỗi.

Quản lý trạng thái giao dịch: Hiển thị rõ ràng các giai đoạn: Đang chờ xác nhận (Pending), Thành công và Thất bại.

Tối ưu trải nghiệm (UX): Xử lý các tình huống từ chối giao dịch, đổi mạng hoặc lỗi kết nối RPC.

🛠 Công nghệ sử dụng
Solidity, Remix IDE, React.js, Ethers.js.

🏗 Kiến trúc hệ thống
Dự án tuân thủ mô hình phân tách dữ liệu On-chain và Off-chain để tối ưu hiệu năng:

On-chain: Nội dung tin nhắn, địa chỉ người gửi và dấu mốc thời gian (timestamp) được lưu trữ vĩnh viễn trên Blockchain.

Off-chain: Giao diện người dùng và logic xử lý trạng thái giao dịch được triển khai tại Frontend.
📑 Thông tin Smart Contract

Mạng: Ethereum Sepolia Testnet.

Địa chỉ Contract: 0xF3D27FB817dCD549C885dA7ff869f9B5f36dAE5b.

Trình khám phá: Xem trên Blockscout

⚙️ Hướng dẫn cài đặt và chạy thử
Để chạy lại dự án này trên môi trường local, hãy làm theo các bước sau:

Clone repository:

Bash
git clone https://github.com/ducpham211/first-web3-repo.git
cd your-repo-name/frontend
Cài đặt thư viện:

Bash
npm install
Chạy dự án:

Bash
npm run dev

Sử dụng: Mở trình duyệt tại localhost:5173, đảm bảo MetaMask đã chuyển sang mạng Sepolia.
