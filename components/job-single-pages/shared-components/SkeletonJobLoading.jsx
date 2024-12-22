import React from "react";
import Skeleton from "react-loading-skeleton";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";

function SkeletonJobLoading({ t }) {

  const URL = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <div className="content-column col-lg-8 col-md-12 col-sm-12">
      <div className="job-block-outer">
        <div className="job-block-seven style-two">
          <div className="inner-box"></div>
          <div className="content">
            <h4>
              <Skeleton width={600} height={30} />
            </h4>

            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                <Skeleton width={160} />
              </li>
              {/* compnay info */}
              <li>
                <span className="icon flaticon-map-locator"></span>
                <Skeleton width={80} />
              </li>
              {/* location info */}
              <li>
                <span className="icon flaticon-clock-3"></span>{" "}
                <Skeleton width={80} />
              </li>
              {/* time info */}
              <li>
                <span className="icon flaticon-money"></span>
                <Skeleton width={80} />
              </li>
              {/* salary info */}
            </ul>
            {/* End .job-info */}

            <ul className="job-other-info">
              <li className="time">
                <Skeleton width={40} />
              </li>
              <li className="required">
                <Skeleton width={40} />
              </li>
              <li className="privacy">
                <Skeleton width={40} />
              </li>
            </ul>
            {/* End .job-other-info */}
          </div>
        </div>
      </div>
      <div className="job-overview-two">
        <h4>{t('job_overview_description')}</h4>
        <ul>
          <li>
            <i className="icon icon-calendar"></i>
            <h5>{t('job_overview_posted')}:</h5>
            <span>
              <Skeleton width={80} />
            </span>
          </li>
          <li>
            <i className="icon icon-expiry"></i>
            <h5>{t('job_overview_expired')}:</h5>
            <span>
              <Skeleton width={80} />
            </span>
          </li>
          <li>
            <i className="icon icon-location"></i>
            <h5>{t('job_overview_location')}:</h5>
            <span>
              <Skeleton width={80} />
            </span>
          </li>
          <li>
            <i className="icon icon-user-2"></i>
            <h5>{t('job_overview_position')}:</h5>
            <span>
              <Skeleton width={80} />
            </span>
          </li>
          <li>
            <i className="icon icon-clock"></i>
            <h5>{t('job_overview_qualification')}:</h5>
            <span>
              <Skeleton width={80} />
            </span>
          </li>
          <li>
            <i className="icon icon-rate"></i>
            <h5>{t('job_overview_rate')}:</h5>
            <span>
              $<Skeleton width={80} /> / hour
            </span>
          </li>
          <li>
            <i className="icon icon-salary"></i>
            <h5>{t('job_overview_salary')}:</h5>
            <span>
              $<Skeleton width={80} />
            </span>
          </li>
        </ul>
      </div>
      {/* <!-- job-overview-two --> */}

      <div className="job-detail">
        <Skeleton width={600} />
      </div>
      {/* End job-details */}

      <div className="other-options">
        <div className="social-share">
          <h5>{t('social_share')}</h5>
          <FacebookShareButton url={URL} hashtag={"#buildforce"}>
            <span className="facebook">
              <i className={`fab fa-facebook-f`}></i> Facebook
            </span>
          </FacebookShareButton>
          <TwitterShareButton url={URL}>
            <span className="twitter">
              <i className={`fab fa-twitter`}></i> Twitter
            </span>
          </TwitterShareButton>
          <LinkedinShareButton url={URL}>
            <span className="linkedin">
              <i className={`fab fa-linkedin`}></i> Linkedin
            </span>
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
}

export default SkeletonJobLoading;
