import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonLoading({ t }) {
  return (
    <section className="candidate-detail-section">
      <div className="candidate-detail-outer">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12 mb-3">
              <div className="candidate-block-five">
                <div className="inner-box">
                  <div className="content">
                    <figure className="image">
                      <Skeleton circle={true} height={80} width={80} />
                    </figure>
                    <h4 className="name">
                      <Skeleton height={30} width={140} />
                    </h4>

                    <ul className="candidate-info">
                      <li className="designation">
                      </li>
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        <Skeleton width={100} />
                      </li>
                      <li>
                        <span className="icon flaticon-money"></span> $
                        <Skeleton width={60} />
                      </li>
                      <li>
                        <span className="icon flaticon-clock"></span> Member{" "}
                        <Skeleton width={80} />
                      </li>
                    </ul>

                    <ul className="post-tags">
                      <li><Skeleton width={50} /></li>
                      <li><Skeleton width={50} /></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*  <!-- Candidate block Five --> */}

              <div className="job-detail">
                <Skeleton width={600} count={3} />

                {/* <!-- Candidate Resume Start --> */}
                {/* Education Block */}
                <div className={`resume-outer mt-5`}>
                  <div className="upper-title">
                    <h4>{t('title_education')}</h4>
                  </div>
                  <div className="resume-block">
                    <div className="inner">
                      <span className="name"></span>
                      <div className="title-box">
                        <div className="info-box">
                          <h3>
                            <Skeleton width={120} />
                          </h3>
                          <span>
                            <Skeleton width={100} />
                          </span>
                        </div>
                        <div className="edit-box">
                          <span className="year">
                            <Skeleton width={40} />
                          </span>
                        </div>
                      </div>
                      <div className="text">
                        <Skeleton width={400} />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Resume BLock --> */}
                </div>

                {/* Work & Experience */}
                <div className={`resume-outer theme-blue`}>
                  <div className="upper-title">
                    <h4>{t('title_work_and_experience')}</h4>
                  </div>
                  <div className="resume-block">
                    <div className="inner">
                      <span className="name">{1}</span>
                      <div className="title-box">
                        <div className="info-box">
                          <h3>
                            <Skeleton width={120} />
                          </h3>
                          <span>
                            <Skeleton width={100} />
                          </span>
                        </div>
                        <div className="edit-box">
                          <span className="year">
                            <Skeleton width={40} />
                          </span>
                        </div>
                      </div>
                      <div className="text">
                        <Skeleton width={300} />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Resume BLock --> */}
                </div>

                {/* Awards */}
                <div className={`resume-outer theme-yellow`}>
                  <div className="upper-title">
                    <h4>{t('title_awards')}</h4>
                  </div>
                  <div className="resume-block">
                    <div className="inner">
                      <span className="name">1</span>
                      <div className="title-box">
                        <div className="info-box">
                          <h3>
                            <Skeleton width={120} />
                          </h3>
                          <span>
                            <Skeleton width={100} />
                          </span>
                        </div>
                        <div className="edit-box">
                          <span className="year">
                            <Skeleton width={40} />
                          </span>
                        </div>
                      </div>
                      <div className="text">
                        <Skeleton width={300} />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Resume BLock --> */}
                </div>
                {/* <!-- Candidate Resume End --> */}

                <Skeleton width={600} count={3} />
              </div>
              {/* End job-details */}
            </div>
            {/* End .content-column */}

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="btn-box">
                  <button
                    className={`theme-btn btn-style-nine`}
                    type="button"
                    disabled
                    download
                  >
                    <i className="flaticon-down-chevron me-1"></i> Download CV
                  </button>
                  <button className={"bookmark-btn"} type="button">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>

                <div className="sidebar-widget">
                  <div className="widget-content">
                    <ul className="job-overview">
                      <li>
                        <i className="icon icon-calendar"></i>
                        <h5>{t('sidebar_widget_experience')}:</h5>
                        <span>
                          <Skeleton width={80} />
                        </span>
                      </li>

                      <li>
                        <i className="icon icon-expiry"></i>
                        <h5>{t('sidebar_widget_age')}:</h5>
                        <span>
                          <Skeleton width={30} />
                        </span>
                      </li>

                      <li>
                        <i className="icon icon-salary"></i>
                        <h5>{t('sidebar_widget_salary')}:</h5>
                        <span>
                          <Skeleton width={70} />
                        </span>
                      </li>

                      <li>
                        <i className="icon icon-language"></i>
                        <h5>{t('sidebar_widget_language')}:</h5>
                        <span>
                          <Skeleton width={150} />
                        </span>
                      </li>

                      <li>
                        <i className="icon icon-degree"></i>
                        <h5>{t('sidebar_widget_education')}:</h5>
                        <span>
                          <Skeleton width={120} />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End .sidebar-widget conadidate overview */}

                <div className="sidebar-widget social-media-widget">
                  <h4 className="widget-title">{t('sidebar_widget_social')}</h4>
                  <div className="widget-content">
                    <div className="social-links">
                      <Skeleton width={100} />
                    </div>
                  </div>
                </div>
                {/* End .sidebar-widget social-media-widget */}

                <div className="sidebar-widget">
                  <h4 className="widget-title">{t('sidebar_widget_skills')}</h4>
                  <div className="widget-content">
                    <ul className="job-skills">
                      <Skeleton width={300} />
                    </ul>
                  </div>
                </div>
                {/* End .sidebar-widget skill widget */}

                {/* End .sidebar-widget contact-widget */}
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
