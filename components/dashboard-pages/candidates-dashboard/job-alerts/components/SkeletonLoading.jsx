import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading({ t }) {
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t('title_h4')}</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select
            className="chosen-single form-select"
          >
            <option value={'-'}>{t('latest')}</option>
            <option value={'+'}>{t('oldest')}</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>{t('table_title')}</th>
                  <th>{t('table_event')}</th>
                  <th>{t('table_created')}</th>
                  <th>{t('table_action')}</th>
                </tr>
              </thead>

              <tbody className="position-relative">
                <tr>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Skeleton width={50} height={50} />
                          </span>
                          <h4>
                            <Skeleton width={140} />
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              <Skeleton width={50} />
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
                  <td>
                    <Skeleton width={120} />
                  </td>
                  <td className="status">
                    <Skeleton width={40} />
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button type="button" data-text="View Job">
                            <span className="la la-eye"></span>
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
      </div>
      {/* End table widget content */}
    </div>
  );
}

export default SkeletonLoading;
