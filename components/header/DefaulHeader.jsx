import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import LanguageSwitch from "../common/LanguageSwitch";

const DefaulHeader = () => {

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
      className={`main-header  ${
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
              <Link href="/">
                <Image width={84} height={50} src="/images/logo-wb-bi-bf.png" alt="brand" />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Login/Register --> */}
          <div className="btn-box gap-3">
            <LanguageSwitch size={46} />
            {
              user?.email
              ?
              <div className="dropdown" style={{maxWidth: '106px'}}>
                <button type='button' id="dropdownAvatar" data-bs-toggle="dropdown" aria-expanded="false">
                  <Link
                      href={`/employers-dashboard/dashboard`}
                      className="d-flex align-items-center"
                      role="button"
                  ></Link>
                <Avatar diameter={50} seed={user?.email} />
                </button>
                <ul className="dropdown-menu" aria-labelledby='dropdownAvatar' style={{left: '20px'}}>
                  <li>
                    <Link href={'/logout'}>
                        <i className={`la la-sign-out`}></i>Logout
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

export default DefaulHeader;
