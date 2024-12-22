import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading() {
  return (
    <div className="row">
      <div className="candidate-block-three">
        <div className="inner-box">
          <div className="content">
            <figure className="image">
              <Skeleton circle={true} width={90} height={90} />
            </figure>
            <h4 className="name">
              <Skeleton width={70} />
            </h4>

            <ul className="candidate-info">
              <li className="designation"><Skeleton width={140} /></li>
              <li>
                <span className="icon flaticon-map-locator"></span>{" "}
                <Skeleton width={70} />
              </li>
              <li className="text-success">
                <span className="icon flaticon-money text-success"></span> $
                <Skeleton width={40} />
              </li>
              <li>
                <span className="icon flaticon-briefcase"></span>
                <Skeleton width={80} />
              </li>
            </ul>
            {/* End candidate-info */}

            <ul className="post-tags">
              <li>
                <button
                  type="button"
                >
                  <Skeleton width={30} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                >
                  <Skeleton width={30} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                >
                  <Skeleton width={30} />
                </button>
              </li>
            </ul>
          </div>
          {/* End content */}
          <div className="btn-box">
            <div className="theme-btn btn-style-five">
              <span className="btn-title">View Profile</span>
            </div>
          </div>
          {/* End btn-box */}
        </div>
      </div>

    </div>
  );
}

export default SkeletonLoading;
