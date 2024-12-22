import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading() {
  return (
    <div className="row align-items-center gap-2 mb-3">
      <div
        className={`col-12 text-dark card bg-light`}
        style={{ height: "auto" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 fw-bold card-body">
            <div className="profile d-flex align-items-center gap-2">
              <Skeleton circle={true} width={50} height={50} />
              <Skeleton width={200} />
            </div>
            <div className="text"><Skeleton width={400} /></div>
          </div>
          <small>
            <i className="fa fa-clock"></i><Skeleton width={60} />
          </small>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
