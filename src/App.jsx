import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import TopupPage from "./pages/TopupPage";
import TransferPage from "./pages/TransferPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useLocation } from "react-router-dom";
import InfaqPage from "./pages/InfaqPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import useAuthStore from "./stores/authStore";

function App() {
  const location = useLocation();

  const { accessToken } = useAuthStore();

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  const isLogin = accessToken !== null && accessToken !== undefined;

  if (!isLogin && !isAuthPage) {
    return <Navigate to="/" />;
  } else if (isLogin && isAuthPage) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/topup" element={<TopupPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/infaq" element={<InfaqPage />} />
        <Route path="/history" element={<TransactionHistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
