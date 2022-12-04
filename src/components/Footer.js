import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ReactComponent as LinkedInDark } from "../assets/linkedin.svg";
import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";
import { ReactComponent as Github } from "../assets/github.svg";
import GithubDark from "../assets/github-dark.png";

function Footer(props) {
  const { isDarkMode } = props;
  return (
    <footer>
      <div className="footer-info">
        <HashLink to="#header">
          <h2>Rubber Ducky</h2>
        </HashLink>
        <div>
          <strong>Copyright © 2022</strong>
        </div>

        <div className="link-container">
          <Link to="/privacy">Privacy</Link>|
          <Link to="/terms-and-conditions">Terms & Conditions</Link>|
          <a href="https://wise-guru.github.io/portfolio/">Portfolio</a>
        </div>

        <div className="icon-container">
          {/* <div className="icons"> */}
          <a href="https://www.linkedin.com/in/myla-a-19b4ab174/">
            <LinkedInDark salt="copy link" title="LinkedIn" />
          </a>

          <a href="https://github.com/wise-guru">
            <img src={GithubDark} alt="Github Logo" title="Github" />
          </a>

          {/* </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
