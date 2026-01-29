# ��� Decentralized Message Board (DApp) — Research Milestone #1

Dự án này là bước nghiên cứu nền tảng về ứng dụng phi tập trung (dApp), thực hiện trong khuôn khổ đồ án môn học **IE213**. Hệ thống cho phép người dùng tương tác với Smart Contract trên mạng **Ethereum Sepolia** để lưu trữ và hiển thị tin nhắn một cách minh bạch.

## Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Công nghệ](#công-nghệ)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Thông tin Smart Contract](#thông-tin-smart-contract)
- [Cài đặt và chạy thử](#cài-đặt-và-chạy-thử)

## Tổng quan

Ứng dụng cho phép người dùng gửi và xem tin nhắn lưu trữ on-chain, đồng thời quản lý trạng thái giao dịch một cách rõ ràng và an toàn.

## Tính năng

- **Kết nối ví Web3:** Tích hợp MetaMask để xác thực người dùng thông qua địa chỉ ví.
- **Tương tác On-chain:** Đọc dữ liệu trực tiếp từ Smart Contract và gửi giao dịch thay đổi trạng thái trên blockchain.
- **Quản lý trạng thái giao dịch:** Hiển thị rõ các giai đoạn: Đang chờ xác nhận (Pending), Thành công, Thất bại.
- **Tối ưu trải nghiệm (UX):** Xử lý các tình huống như từ chối giao dịch, đổi mạng hoặc lỗi kết nối RPC.

## Công nghệ

- Solidity
- Remix IDE
- React.js
- Ethers.js

## Kiến trúc hệ thống

Dự án tuân thủ mô hình tách biệt dữ liệu On-chain và Off-chain để tối ưu hiệu năng:

- **On-chain:** Nội dung tin nhắn, địa chỉ người gửi và dấu mốc thời gian (timestamp) được lưu trữ vĩnh viễn trên blockchain.
- **Off-chain:** Giao diện người dùng và logic xử lý trạng thái giao dịch được triển khai tại frontend.

## Thông tin Smart Contract

- **Mạng:** Ethereum Sepolia Testnet
- **Địa chỉ Contract:** 0xF3D27FB817dCD549C885dA7ff869f9B5f36dAE5b
- **Trình khám phá:** Xem trên Blockscout

## Cài đặt và chạy thử

Để chạy dự án trên môi trường local, làm theo các bước sau:

1. Clone repository

```bash
git clone https://github.com/ducpham211/first-web3-repo.git
cd your-repo-name/frontend
```

2. Cài đặt phụ thuộc

```bash
npm install
```

3. Chạy dự án

```bash
npm run dev
```

4. Mở trình duyệt tại `http://localhost:5173` và đảm bảo MetaMask đã chuyển sang mạng **Sepolia**.

---

Nếu cần thêm hướng dẫn hoặc muốn tôi cập nhật README bằng tiếng Anh, cho tôi biết nhé.
