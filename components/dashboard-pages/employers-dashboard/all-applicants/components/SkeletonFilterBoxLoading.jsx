import React from "react";
import { useTranslation } from "react-i18next";

function SkeletonFilterBoxLoading() {

  const { t } = useTranslation('dashboard/employer/all_applicants')

  function customDate(days) {
    return new Date(Date.now() - (days * 24 * 60 * 60 * 1000))
  }

  return (
    <div className="chosen-outer">
      <select className="chosen-single form-select chosen-container" >
        <option defaultValue value={''}>{t('sort_by_jobs')}</option>
      </select>
      {/* <!--Tabs Box--> */}

      <select className="chosen-single form-select chosen-container">
        <option defaultValue value={''}>{t('sort_by_time')}</option>
        <option value={customDate(7)}>{t('sort_by_time_week')}</option>
        <option value={customDate(30)}>{t('sort_by_time_month')}</option>
        <option value={customDate(90)}>{t('sort_by_time_quarter')}</option>
        <option value={customDate(365)}>{t('sort_by_time_year')}</option>
      </select>
      {/* <!--Tabs Box--> */}
    </div>
  );
}

export default SkeletonFilterBoxLoading;
