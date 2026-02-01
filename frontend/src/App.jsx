import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./features/auth/context/AuthContext";
import LoginPage from "./features/auth/pages/LoginPage";
import MessageBoardPage from "./features/message-board/pages/MessageBoardPage";
function App() {
  const { token } = useAuthContext(); // Lấy token dùng chung ở đây

  return (
    <Routes>
      <Route
        path="/"
        element={!token ? <LoginPage /> : <Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={token ? <MessageBoardPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
export default App;
