import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonRecentApplicantLoading() {
  return (
    <div className="row">

        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <Skeleton circle={true} width={90} height={90} />
              </figure>
              <h4 className="name">
                <Skeleton width={100} />
              </h4>

              <ul className="candidate-info">
                <li className="designation">
                  <Skeleton width={220} />
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  <Skeleton width={90} />
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  $ <Skeleton width={60} />
                </li>
              </ul>
              {/* End candidate-info */}

              <ul className="post-tags">
                <li>
                  <a href="#"><Skeleton width={40} /></a>
                </li>
                <li>
                  <a href="#"><Skeleton width={40} /></a>
                </li>
                <li>
                  <a href="#"><Skeleton width={40} /></a>
                </li>
              </ul>
            </div>
            {/* End content */}

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <button>
                    <span className="la la-eye"></span>
                  </button>
                </li>
                <li>
                  <button 
                    className={'bg-secondary text-white'}
                    disabled
                  >
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button
                    className='bg-secondary text-white'
                    disabled
                  >
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button
                    className="bg-secondary text-white"
                    disabled
                  >
                    <span className="la la-bookmark-o"></span>
                  </button>
                </li>
              </ul>
            </div>
            {/* End admin options box */}
          </div>
        </div>

    </div>
  );
}

export default SkeletonRecentApplicantLoading;
