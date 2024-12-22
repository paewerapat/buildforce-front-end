import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading() {
  return (
    <tr>
      <td>
        {/* <!-- Job Block --> */}
        <div className="job-block">
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <Skeleton width={60} height={60} />
              </span>
              <h4>
                <Skeleton width={140} />
              </h4>
              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  <Skeleton width={90} />
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
              <button
                className="bg-warning"
                data-text="Delete Shortlisted"
                type="button"
              >
                <span className="la la-bookmark text-light"></span>
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default SkeletonLoading;
