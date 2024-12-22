import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicantByEmployerAction } from "../../../../../app/actions/employer/applicantAction";
import { setFilterTopBoxApplicantByEmployer } from "../../../../../app/features/employer/applicantSlice";
import { useTranslation } from "react-i18next";

const WidgetTopFilterBox = ({ job }) => {

  const { t } = useTranslation('dashboard/employer/all_applicants')
  const { user } = useSelector(state => state)
  const dispatch = useDispatch();
  const filterJob = useRef("");
  const filterDate = useRef("");

  function customDate(days) {
    return new Date(Date.now() - (days * 24 * 60 * 60 * 1000))
  }

  function selectFilterHandler() {
    const filter = {
      filterJob: typeof filterJob.current === 'string' ? filterJob.current : "",
      filterDate: typeof filterDate.current === 'string' ? filterDate.current : ""
    }
    dispatch(setFilterTopBoxApplicantByEmployer({ filterDate: filter.filterDate, filterJob: filter.filterJob }))
    dispatch(getApplicantByEmployerAction({ filter, id: user?.employerInfo?.id }))
  }

  return (
    <div className="chosen-outer">
      <select className="chosen-single form-select chosen-container" 
        onChange={(e) => {
          filterJob.current = e.target.value;
          selectFilterHandler()
        }}
        ref={filterJob}
      >
        <option defaultValue value={''}>{t('sort_by_jobs')}</option>
        {
          job?.map((item) => (
            <option key={item.id} value={item.id}>{item.jobTitle.slice(0, 20)}{item.jobTitle.length > 20 && '...'}</option>
          ))
        }
      </select>
      {/* <!--Tabs Box--> */}

      <select className="chosen-single form-select chosen-container" 
        onChange={(e) => {
          filterDate.current = e.target.value;
          selectFilterHandler()
        }}
        ref={filterDate}
      >
        <option defaultValue value={''}>{t('sort_by_time')}</option>
        <option value={customDate(7)}>{t('sort_by_time_week')}</option>
        <option value={customDate(30)}>{t('sort_by_time_month')}</option>
        <option value={customDate(90)}>{t('sort_by_time_quarter')}</option>
        <option value={customDate(365)}>{t('sort_by_time_year')}</option>
      </select>
      {/* <!--Tabs Box--> */}
    </div>
  );
};

export default WidgetTopFilterBox;
