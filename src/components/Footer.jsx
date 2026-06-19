import { Link } from "react-router-dom";
import { FiGithub, FiYoutube, FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-brand-name">
              Chris<span>Code</span>Lab
            </span>
            <p>
              Backend Engineer building scalable systems
              <br />
              and reliable platforms.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <div className="footer-social-list">
              <a
                href="https://github.com/ChrisCodeLab"
                className="footer-social-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/chriscodelab/"
                className="footer-social-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@ChrisCodeLab"
                className="footer-social-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiYoutube /> YouTube
              </a>
              <a
                href="https://leetcode.com/u/ChrisCodeLab/"
                className="footer-social-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiLeetcode /> LeetCode
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Christopher M. All rights reserved.</p>
          <p>Built with React &amp; Vite</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
