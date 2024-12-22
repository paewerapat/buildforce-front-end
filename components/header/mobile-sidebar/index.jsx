"use client";
import Link from "next/link";
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from "react-pro-sidebar";

import { useSelector } from "react-redux";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation("common");
  const { user } = useSelector((state) => state);

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <Sidebar>
        <Menu>
          <MenuItem>
            <Link href={"/"}>
              <i className="fa fa-home" /> {t("Home")}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={"/job"}>
              <i className="fa fa-briefcase" /> {t("Find Jobs")}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={"/employers"}>
              <i className="fa fa-building" /> {t("Employers")}
            </Link>
          </MenuItem>
          {user?.type === "employer" && (
            <MenuItem>
              <Link href={`/candidates`}>
                <i className="fa fa-user" /> {t("Candidates")}
              </Link>
            </MenuItem>
          )}
          {user?.id && (
            <>
              {/* Dashboard Employers or Candidates */}
              <MenuItem>
                <Link href={`/${user?.type}s-dashboard/dashboard`}>
                  <i className="fa fa-chart-pie" /> {t("Dashbaord")}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href={`/logout`}>
                  <i className="fa fa-sign-out-alt" /> {t("Logout")}
                </Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </Sidebar>

      <SidebarFooter t={t} />
    </div>
  );
};

export default Index;
