import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function SkeletonContentBoxLoading() {

  const { t } = useTranslation('dashboard/employer/all_applicants')

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>{t('widget_content_h6')}</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals">
                {t('total')}: 0
              </Tab>
              <Tab className="tab-btn approved">
                {t('approved')}: 0
              </Tab>
              <Tab className="tab-btn rejected">
                {t('rejected')}: 0
              </Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                <div
                  className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                >
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
                          <a href="#"><Skeleton width={30} /></a>
                        </li>
                        <li>
                          <a href="#"><Skeleton width={30} /></a>
                        </li>
                        <li>
                          <a href="#"><Skeleton width={30} /></a>
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
                          <button
                            className={'bg-success text-white'}
                            disabled
                          >
                            <span className="la la-check"></span>
                          </button>
                        </li>
                        <li>
                          <button
                            className='bg-danger text-white'
                            disabled
                          >
                            <span className="la la-times-circle"></span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="bg-warning text-white"
                          >
                            <span className="la la-bookmark-o"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    {/* End admin options box */}
                  </div>
                </div>
                
                <div
                  className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                >
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
                          <a href="#"><Skeleton width={30} /></a>
                        </li>
                        <li>
                          <a href="#"><Skeleton width={30} /></a>
                        </li>
                        <li>
                          <a href="#"><Skeleton width={30} /></a>
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
                          <button
                            className={'bg-success text-white'}
                            disabled
                          >
                            <span className="la la-check"></span>
                          </button>
                        </li>
                        <li>
                          <button
                            className='bg-danger text-white'
                            disabled
                          >
                            <span className="la la-times-circle"></span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="bg-warning text-white"
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
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default SkeletonContentBoxLoading;
