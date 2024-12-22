import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading({ t }) {
  return (
    <section className="job-detail-section">
      {/* <!-- Upper Box --> */}
      <div className="upper-box">
        <div className="auto-container">
          <div className="job-block-seven">
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <Skeleton width={100} height={100} />
                </span>
                <h4><Skeleton width={300} /></h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    <Skeleton width={100} />
                  </li>
                  {/* compnay info */}
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    <Skeleton width={70} />
                  </li>
                  {/* location info */}
                  <li>
                    <span className="icon flaticon-telephone-1"></span>
                    <Skeleton width={80} />
                  </li>
                  {/* time info */}
                  <li>
                    <span className="icon flaticon-mail"></span>
                    <Skeleton width={90} />
                  </li>
                  {/* salary info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  <li className="time">
                    {t('job_other_info')} – <Skeleton width={80} />
                  </li>
                </ul>
                {/* End .job-other-info */}
              </div>
              {/* End .content */}

              <div className="btn-box">
                {/* <button
                  className="theme-btn btn-style-one"
                  data-bs-toggle="modal"
                  data-bs-target="#privateMessage"
                >
                  Private Message
                </button> */}
                <button
                  className={"bookmark-btn"}
                  type="button"
                >
                  <i className="flaticon-bookmark"></i>
                </button>
              </div>
              {/* End btn-box */}

            </div>
          </div>
          {/* <!-- Job Block --> */}
        </div>
      </div>
      {/* <!-- Upper Box --> */}

      {/* <!-- job-detail-outer--> */}
      <div className="job-detail-outer">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              {/*  job-detail */}
              <div className="title-box">
                <h3><Skeleton width={30} /> {t('others_jobs_available')}</h3>

              </div>
              {/* End .title-box */}
                <div className="job-block">
                  <div className="inner-box">
                    <div className="content">
                      <span className="company-logo">
                        <Skeleton width={50} height={50} />
                      </span>
                      <h4>
                        <Skeleton width={400} />
                      </h4>

                      <ul className="job-info">
                        <li>
                          <span className="icon flaticon-briefcase"></span>
                          <Skeleton width={120} />
                        </li>
                        {/* compnay info */}
                        <li>
                          <span className="icon flaticon-map-locator"></span>
                          <Skeleton width={100} />
                        </li>
                        {/* location info */}
                        <li>
                          <span className="icon flaticon-clock-3"></span>{" "}
                          <Skeleton width={100} />
                        </li>
                        {/* time info */}
                        <li>
                          <span className="icon flaticon-money"></span>{" "}
                          <Skeleton width={90} />
                        </li>
                        {/* salary info */}
                      </ul>
                      {/* End .job-info */}

                      <ul className="job-other-info">
                        <li className={`time`}>
                          <Skeleton width={40} />
                        </li>
                        <li className={`privacy`}>
                          <Skeleton width={40} />
                        </li>
                        <li className={`required`}>
                          <Skeleton width={40} />
                        </li>
                      </ul>
                      {/* End .job-other-info */}
                      <button className="bookmark-btn">
                        <span className="flaticon-bookmark"></span>
                      </button>
                    </div>
                  </div>
                </div>
              {/* End job-detail */}

              {/* <!-- Related Jobs --> */}
            </div>
            {/* End .content-column */}

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="sidebar-widget company-widget">
                  <div className="widget-content">
                    {/*  compnay-info */}
                    <ul className="company-info mt-0">
                      <li>
                        {t('sidebar_widget_industry')}:{" "}
                        <span>
                          <Skeleton width={60} />
                        </span>
                      </li>
                      <li>
                      {t('sidebar_widget_company_size')}:{" "}
                        <span>
                          <Skeleton width={50} />
                        </span>
                      </li>
                      <li>
                      {t('sidebar_widget_phone')}:{" "}
                        <span>
                          <Skeleton width={70} />
                        </span>
                      </li>
                      <li>
                      {t('sidebar_widget_email')}:{" "}
                        <span>
                          <Skeleton width={80} />
                        </span>
                      </li>
                      <li>
                      {t('sidebar_widget_location')}:{" "}
                        <span className="d-flex gap-1">
                          <Skeleton width={80} />
                        </span>
                      </li>
                      <li>
                      {t('sidebar_widget_social')}:
                        <span>
                          <Skeleton width={40} />
                        </span>
                      </li>
                    </ul>
                    {/* End compnay-info */}

                    <div className="btn-box">
                      <button
                        className="theme-btn btn-style-nine text-white"
                        type="button"
                        disabled
                      >
                        {t('sidebar_widget_website')}
                      </button>
                    </div>
                    {/* btn-box */}
                  </div>
                </div>
                {/* End company-widget */}

                {/* End sidebar-widget */}
              </aside>
              {/* End .sidebar */}
            </div>
            {/* End .sidebar-column */}
          </div>
        </div>
      </div>
      {/* <!-- job-detail-outer--> */}
    </section>
  );
}

export default SkeletonLoading;
