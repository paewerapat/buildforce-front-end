import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

function SkeletonStaticsLoading() {

  const { t } = useTranslation('dashboard/employer/dashboard')

  return (
    <div className="row">
    {/* Posted Jobs BLOCK */}
      <div
        className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
      >
        <div className={`ui-item ui-blue`}>
          <div className="left">
            <i className={`icon la flaticon-briefcase`}></i>
          </div>
          <div className="right">
            <h4><Skeleton width={30} /></h4>
            <p>{t('card_block_posted_jobs')}</p>
          </div>
        </div>
      </div>

      {/* Application ฺBLOCK */}
      <div
        className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
      >
        <div className={`ui-item ui-red`}>
          <div className="left">
            <i className={`icon la la-file-invoice`}></i>
          </div>
          <div className="right">
            <h4><Skeleton width={30} /></h4>
            <p>{t('card_block_applicant')}</p>
          </div>
        </div>
      </div>

      {/* Shortlist BLOCK */}
      <div
        className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
      >
        <div className={`ui-item ui-green`}>
          <div className="left">
            <i className={`icon la la-bookmark-o`}></i>
          </div>
          <div className="right">
            <h4><Skeleton width={30} /></h4>
            <p>{t('card_block_shortlisted')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonStaticsLoading;
