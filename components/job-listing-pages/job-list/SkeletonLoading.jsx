import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading() {
  return (
    <div className="row">
      <div className="job-block-four col-lg-6 col-md-6 col-sm-12">
        <div className="inner-box">
          <ul className="job-other-info">
            <li className="privacy">
              <Skeleton width={20} />
            </li>
            <li className="time">
              <Skeleton width={20} />
            </li>
            <li className="required">
              <Skeleton width={20} />
            </li>
          </ul>
          <span className="company-logo">
            <Skeleton circle={true} width={90} height={90} />
          </span>
          <span className="company-name">
            <Skeleton width={120} />
          </span>
          <h4 className="mb-2 text-capitalize">
            <Skeleton width={200} count={2} />
          </h4>
          <small
            className="salary text-success d-flex gap-1 justify-content-center"
            style={{ fontWeight: "500" }}
          >
            <span className="fa fa-money-bill"></span> <Skeleton width={50} />
          </small>
          <div className="location">
            <span className="icon flaticon-map-locator"></span>
            <Skeleton width={70} />
          </div>
          <ul className="post-tags">
            <li>
              <Skeleton width={40} />
            </li>
            <li>
              <Skeleton width={40} />
            </li>
          </ul>
        </div>
      </div>
      <div className="job-block-four col-lg-6 col-md-6 col-sm-12">
        <div className="inner-box">
          <ul className="job-other-info">
            <li className="privacy">
              <Skeleton width={20} />
            </li>
            <li className="time">
              <Skeleton width={20} />
            </li>
            <li className="required">
              <Skeleton width={20} />
            </li>
          </ul>
          <span className="company-logo">
            <Skeleton circle={true} width={90} height={90} />
          </span>
          <span className="company-name">
            <Skeleton width={120} />
          </span>
          <h4 className="mb-2 text-capitalize">
            <Skeleton width={200} count={2} />
          </h4>
          <small
            className="salary text-success d-flex gap-1 justify-content-center"
            style={{ fontWeight: "500" }}
          >
            <span className="fa fa-money-bill"></span> <Skeleton width={50} />
          </small>
          <div className="location">
            <span className="icon flaticon-map-locator"></span>
            <Skeleton width={70} />
          </div>
          <ul className="post-tags">
            <li>
              <Skeleton width={40} />
            </li>
            <li>
              <Skeleton width={40} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
