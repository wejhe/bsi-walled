import logo from "/logo.svg";
import darkmode from "/darkmode.svg";

const Navbar = () => {
  return (
    <>
      <nav>
        <a className="clickableicon" href="/">
          <img src={logo} />
        </a>
        <div className="menu">
          <div>
            <a className="navlink" href="/">
              Dashboard
            </a>
            <a className="navlink" href="/topup">
              Top-Up
            </a>
            <a className="navlink" href="/transfer">
              Transfer
            </a>
            <a className="navlink" href="#">
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
