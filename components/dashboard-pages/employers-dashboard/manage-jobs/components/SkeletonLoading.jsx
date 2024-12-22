import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading() {
  
  const { t } = useTranslation('dashboard/employer/manage_job')

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t('title_h4')}</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option value={'-'}>{t('latest')}</option>
            <option value={'+'}>{t('oldest')}</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>{t('table_title')}</th>
                <th>{t('table_applicants')}</th>
                <th>{t('table_create_and_expire')}</th>
                <th>{t('table_status')}</th>
                <th>{t('table_action')}</th>
              </tr>
            </thead>

            <tbody>
                <tr>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Skeleton width={50} height={50} />
                          </span>
                          <h4 className="ms-3">
                            <Skeleton width={200} />
                          </h4>
                          <ul className="job-info ms-3">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              <Skeleton width={120} />
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              <Skeleton width={80} />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <a href="#">0 {t('Applied')}</a>
                  </td>
                  <td>
                    <Skeleton width={160} />
                    <Skeleton width={160} />
                  </td>
                  <td className="status"><Skeleton width={60} /></td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                            <button data-text={t("View Aplication")}>
                              <span className="la la-eye"></span>
                            </button>
                        </li>
                        <li>
                            <button data-text={t("Edit Job")}>
                              <span className="la la-pencil"></span>
                            </button>
                        </li>
                        <li>
                          <button data-text={t("Delete Job")} type="button">
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
}

export default SkeletonLoading;
