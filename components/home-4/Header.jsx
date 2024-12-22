import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../header/Avatar";
import HeaderNavContent from "../header/HeaderNavContent";
import LanguageSwitch from "../common/LanguageSwitch";

const Header = () => {

  const { user } = useSelector(state => state);
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
    // <!-- Main Header-->
    <header
      className={`main-header header-style-two alternate  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box" style={{ padding: '0 60px'}}>
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image src="/images/logo-bb-wi-wf.png" height={50} width={84} alt="brand" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="d-flex align-items-center btn-box2 gap-3">
              <LanguageSwitch size={48} />
            {
              user?.email 
              ?
              <div className="dropdown">
                <button type='button' id="dropdownAvatar" data-bs-toggle="dropdown" aria-expanded="false">
                  <Link
                      href={`/employers-dashboard/dashboard`}
                      className="d-flex align-items-center"
                      role="button"
                  ></Link>
                <Avatar diameter={50} seed={user?.email} />
                </button>
                <ul className="dropdown-menu" aria-labelledby='dropdownAvatar' style={{left: '20px', minWidth: '84px'}}>
                  <li>
                    <Link href={'/logout'} 
                      className="d-flex justify-content-center align-items-center gap-2"
                      style={{minWidth: '108px'}}
                    >
                        <i className={`la la-sign-out fs-4`}></i> Logout
                    </Link>
                  </li>
                </ul>
              </div>
              :
              <Link
                href="/login"
                className="theme-btn btn-style-three call-modal"
              >
                Login / Register
              </Link>
            }
            {
              !user?.type === "candidate" || !user.type &&
              <Link
                href="/employers-dashboard/post-jobs"
                className="theme-btn btn-style-one"
              >
                Job Post
              </Link>
            }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
