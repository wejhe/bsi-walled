import logo from "/logo.svg";
import darkmode from "/darkmode.svg";
import useAuthStore from "../stores/authStore";

const Navbar = () => {
  const { clearTokens, clearUserData } = useAuthStore();

  const handleLogout = () => {
    clearTokens();
    clearUserData();
  };

  return (
    <>
      <nav>
        <a className="clickableicon" href="/dashboard">
          <img src={logo} />
        </a>
        <div className="menu">
          <div>
            <a className="navlink" href="/dashboard">
              Dashboard
            </a>
            <a className="navlink" href="/topup">
              Top-Up
            </a>
            <a className="navlink" href="/transfer">
              Transfer
            </a>
            <a className="navlink" onClick={handleLogout} href="/">
              Sign Out
            </a>
          </div>
          <p className="navlink">|</p>
          <a className="clickableicon" href="#">
            <img src={darkmode} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
