import Social from "./Social";

const CopyrightFooter = () => {
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            © {new Date().getFullYear()} Buidlforce. All Right Reserved.
          </div>
          <div className="social-links">
            <a href="mailto:buidlforce@gmail.com" className="email">
              buidlforce@gmail.com
            </a>
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
