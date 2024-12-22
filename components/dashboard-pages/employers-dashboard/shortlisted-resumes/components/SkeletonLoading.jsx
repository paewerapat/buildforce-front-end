import React from "react";
import Skeleton from "react-loading-skeleton";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function SkeletonLoading() {
  return (
    <div className="widget-content">
      <div className="row">
        <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <Skeleton circle={true} width={80} height={80} />
              </figure>
              <h4 className="name">
                <Skeleton width={200} />
              </h4>

              <ul className="candidate-info">
                <li className="designation">
                  <Skeleton width={70} />
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  <Skeleton width={60} />
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  <Skeleton width={50} />
                </li>
              </ul>
              {/* End candidate-info */}

              <ul className="post-tags">
                <li>
                  <a href="#">
                    <Skeleton width={30} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Skeleton width={30} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Skeleton width={30} />
                  </a>
                </li>
              </ul>
            </div>
            {/* End content */}

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <button data-text="View Aplication">
                    <span className="la la-eye"></span>
                  </button>
                </li>
                <li>
                  <button className={"bg-success text-white"} disabled>
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button className="bg-danger text-white" disabled>
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button className="bg-warning text-white">
                    <span className="la la-bookmark-o"></span>
                  </button>
                </li>
              </ul>
            </div>
            {/* End admin options box */}
          </div>
        </div>

        <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <Skeleton circle={true} width={80} height={80} />
              </figure>
              <h4 className="name">
                <Skeleton width={200} />
              </h4>

              <ul className="candidate-info">
                <li className="designation">
                  <Skeleton width={70} />
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  <Skeleton width={60} />
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  <Skeleton width={50} />
                </li>
              </ul>
              {/* End candidate-info */}

              <ul className="post-tags">
                <li>
                  <a href="#">
                    <Skeleton width={30} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Skeleton width={30} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Skeleton width={30} />
                  </a>
                </li>
              </ul>
            </div>
            {/* End content */}

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <button data-text="View Aplication">
                    <span className="la la-eye"></span>
                  </button>
                </li>
                <li>
                  <button className={"bg-success text-white"} disabled>
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button className="bg-danger text-white" disabled>
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button className="bg-warning text-white">
                    <span className="la la-bookmark-o"></span>
                  </button>
                </li>
              </ul>
            </div>
            {/* End admin options box */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
