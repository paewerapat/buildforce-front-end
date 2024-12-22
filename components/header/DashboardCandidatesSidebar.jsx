import Link from "next/link";
import { useRouter } from "next/router";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../app/features/toggle/toggleSlice";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useTranslation } from "react-i18next";

const DashboardCandidatesSidebar = () => {

  const { t } = useTranslation('dashboard/candidate/menu')
  const { menu } = useSelector((state) => state.toggle);
  const router = useRouter();

  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1266">
        <div className="fix-icon" onClick={menuToggleHandler} onKeyDown={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, router.asPath) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
              onKeyDown={menuToggleHandler}
            >
              <Link href={item.routePath}>
                <i className={`la ${item.icon}`}></i> {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
        {/* End navigation */}
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
