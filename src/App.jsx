import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import apiconfig from "./utils/apiconfig";
import PromptCreatePIN from "./components/PromptCreatePIN";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { accessToken } = useAuthStore();

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  const isLogin = accessToken !== null && accessToken !== undefined;

  const handleSetPin = async () => {
    const pin = await PromptCreatePIN();

    if (pin) {
      const endpoint = `${apiconfig.BASE_URL}/auth/set-pin`;
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Account Registered!",
            text: `Your account has been created with PIN ${pin}`,
          });

          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  if (!isLogin && !isAuthPage) {
    return <Navigate to="/" />;
  } else if (isLogin && isAuthPage) {
    return <Navigate to="/dashboard" />;
  }

  if (!isAuthPage) {
    const endpoint = `${apiconfig.BASE_URL}/api/users/has-pin`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const hasPin = data.data;
        if (!hasPin) {
          handleSetPin();
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
