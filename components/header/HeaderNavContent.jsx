import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  candidateItems,
  employerItems,
  homeItems
} from "../../data/mainMenuData";
import {
  isActiveLink,
  isActiveParent
} from "../../utils/linkActiveChecker";

const HeaderNavContent = () => {

  const router = useRouter();
  const { user } = useSelector(state => state)

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveParent(homeItems, router.asPath) ? "current" : ""
            }`}
          >
            <Link href={'/'}>
              <span>Home</span>
            </Link>
          </li>
          {/* End homepage menu items */}

          <li
            className={`${
              router.asPath === "/job" ? "current" : ""
            } has-mega-menu`}
            id="has-mega-menu"
          >
            <Link href={'/job'}>
              <span>Find Jobs</span>
            </Link>
          </li>
          {/* End findjobs menu items */}

          <li
            className={`${
              isActiveParent(employerItems, router.asPath) ||
              router.asPath === "/employers"
                ? "current"
                : ""
            }`}
          >
            <Link href={'/employers'}>
              <span>Employers</span>
            </Link>
          </li>
          {/* End Employers menu items */}

          {
            user?.type === "employer" &&
            <li
            className={`${
              isActiveParent(candidateItems, router.asPath) ||
              router.asPath === "/candidates"
                ? "current"
                : ""
            }`}
          >
            <Link href={'/candidates'}>
              <span>Candidates</span>
            </Link>
          </li>
          }
          {/* End Employers menu items */}

          {
            user?.id &&
            <>
            {/* Employers Dashboard */}
            <li
            className={`${
              isActiveLink("/employers-dashboard/dashboard", router.asPath) ||
              isActiveLink("/candidates-dashboard/dashboard", router.asPath)
                ? "current "
                : ""
              }`}
            >
              <Link href={`/${user?.type}s-dashboard/dashboard`}>
                <span>Dashboard</span>
              </Link>
            </li>
            </>
          }
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;