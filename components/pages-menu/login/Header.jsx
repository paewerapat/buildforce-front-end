import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitch from "../../common/LanguageSwitch";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`main-header ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/" className="noSticky">
                  <Image height={120} width={120} src="/images/logo-bb-wi-wf.png" alt="logo" title="brand" />
                </Link>
                <Link href="/" className="isSticky">
                  <Image height={90} width={90} src="/images/logo-wb-bi-bf.png" alt="logo" title="brand" />
                </Link>
              </div>
            </div>
          </div>
          <LanguageSwitch size={48} />
          {/* End nav-outer */}
        </div>
      </div>
    </header>
  );
};

export default Header;
