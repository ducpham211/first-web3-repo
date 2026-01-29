// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; // Sử dụng phiên bản Solidity theo yêu cầu [cite: 15]

contract MessageBoard {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    Message public lastMessage;

    // Event để Frontend có thể bắt được tín hiệu khi giao dịch thành công 
    event MessageUpdated(address indexed sender, string newContent, uint256 timestamp);

    // Hàm ghi dữ liệu (Gửi giao dịch - tốn Gas) 
    function postMessage(string memory _content) public {
        lastMessage = Message(msg.sender, _content, block.timestamp);
        
        emit MessageUpdated(msg.sender, _content, block.timestamp);
    }

    // Hàm đọc dữ liệu (Miễn phí) 
    function getLastMessage() public view returns (address, string memory, uint256) {
        return (lastMessage.sender, lastMessage.content, lastMessage.timestamp);
    }
}