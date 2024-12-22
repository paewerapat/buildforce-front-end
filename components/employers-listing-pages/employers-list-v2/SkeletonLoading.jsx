import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading() {
  return (
    <div className="row">
      
      <div
        className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12"
      >
        <div className="inner-box">
          <div className="content-inner">
            <span className="featured">Featured</span>
            <span className="company-logo">
              <Skeleton circle={true} width={60} height={60} />
            </span>
            <h4>
             <Skeleton width={100} />
            </h4>
            <ul className="job-info flex-column">
              <li className="me-0">
                <span className="icon flaticon-map-locator"></span>
                <Skeleton width={70} />
              </li>
              <li className="me-0">
                <span className="icon flaticon-briefcase"></span>
                <Skeleton width={40} />
              </li>
            </ul>
          </div>
          <div className="job-type me-0">
            <Skeleton width={140} />
          </div>
        </div>
      </div>

      <div
        className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12"
      >
        <div className="inner-box">
          <div className="content-inner">
            <span className="featured">Featured</span>
            <span className="company-logo">
              <Skeleton circle={true} width={60} height={60} />
            </span>
            <h4>
             <Skeleton width={100} />
            </h4>
            <ul className="job-info flex-column">
              <li className="me-0">
                <span className="icon flaticon-map-locator"></span>
                <Skeleton width={70} />
              </li>
              <li className="me-0">
                <span className="icon flaticon-briefcase"></span>
                <Skeleton width={40} />
              </li>
            </ul>
          </div>
          <div className="job-type me-0">
            <Skeleton width={140} />
          </div>
        </div>
      </div>

      <div
        className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12"
      >
        <div className="inner-box">
          <div className="content-inner">
            <span className="featured">Featured</span>
            <span className="company-logo">
              <Skeleton circle={true} width={60} height={60} />
            </span>
            <h4>
             <Skeleton width={100} />
            </h4>
            <ul className="job-info flex-column">
              <li className="me-0">
                <span className="icon flaticon-map-locator"></span>
                <Skeleton width={70} />
              </li>
              <li className="me-0">
                <span className="icon flaticon-briefcase"></span>
                <Skeleton width={40} />
              </li>
            </ul>
          </div>
          <div className="job-type me-0">
            <Skeleton width={140} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default SkeletonLoading;
