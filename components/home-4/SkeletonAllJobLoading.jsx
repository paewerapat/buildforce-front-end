import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonAllJobLoading() {
  return (
    <>
      
      <div
        className="category-block col-lg-4 col-md-6 col-sm-12"
      >
        <div className="inner-box">
          <div className="content">
            <span className="icon"></span>
            <h4>
              <Skeleton width={120} />
            </h4>
            <p><Skeleton width={60} /></p>
          </div>
        </div>
      </div>
      
      <div
        className="category-block col-lg-4 col-md-6 col-sm-12"
      >
        <div className="inner-box">
          <div className="content">
            <span className="icon"></span>
            <h4>
              <Skeleton width={120} />
            </h4>
            <p><Skeleton width={60} /></p>
          </div>
        </div>
      </div>
      
      <div
        className="category-block col-lg-4 col-md-6 col-sm-12"
      >
        <div className="inner-box">
          <div className="content">
            <span className="icon"></span>
            <h4>
              <Skeleton width={120} />
            </h4>
            <p><Skeleton width={60} /></p>
          </div>
        </div>
      </div>

    </>
  );
}

export default SkeletonAllJobLoading;
