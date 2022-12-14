import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/blog-logo.png";
import DarkModeToggle from "./DarkModeToggle";
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";

function Header(props) {
  const { isDarkMode, setIsDarkMode } = props;
  const [isMenuActive, setIsMenuActive] = useState(false);

  //   const navbarLinks = document.querySelector(".navbar-links");

  //   toggleButton.addEventListener("click", () => {
  //     navbarLinks.classList.toggle("active");
  //   });

  const toggleClass = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <header id="header">
      <div className="header-left">
        <Link to="/">
          <img src={Logo} alt="The letter B" />
        </Link>
        <Link to="/">
          <h3>Rubber Ducky</h3>
        </Link>
      </div>
      <div>
        <button className="toggle-button toggle" onClick={toggleClass}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      <nav className={`navbar-links ${isMenuActive ? "active" : null}`}>
        <ul>
          <li>
            <Link to="/" className="hover">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="hover">
              Posts
            </Link>
          </li>
          <li>{/* <Link to="/about">About</Link> */}</li>
          <li>
            <div className="theme-container">
              <div>
                <img src={Sun} alt="sun" />
              </div>
              <DarkModeToggle
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
              <div>
                <img src={Moon} alt="moon" />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
