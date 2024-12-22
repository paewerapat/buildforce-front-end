import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";
import { useSelector } from "react-redux";
import LanguageSwitch from '../common/LanguageSwitch'

const MobileMenu = () => {

  const { user } = useSelector(state => state)

  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image width={60} height={60} src="/images/logo-wb-bi-bf.png" alt="brand" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">

            <LanguageSwitch size={38} />

            <div className="login-box">
              <Link
                href={user?.type ? `/${user.type}s-dashboard/dashboard` : "/login"}
              >
                <span className="icon icon-user"></span>
              </Link>
            </div>
            {/* login popup end */}

            <button
              type="button"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </button>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
