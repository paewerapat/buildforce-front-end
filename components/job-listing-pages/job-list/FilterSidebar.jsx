import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import ExperienceLevel from "../components/ExperienceLevel";
import JobType from "../components/JobType";
import SalaryRangeSlider from "../components/SalaryRangeSlider";
import SearchBox from "../components/SearchBox";
import { filterJobsAction, resetFilterJobsAction } from "../../../app/actions/jobAction";
import Tag from "../components/Tag";
import { useTranslation } from "react-i18next";

const FilterSidebar = () => {

  const { t } = useTranslation('jobs')
  const { jobFilter } = useSelector(state => state)
  const dispatch = useDispatch();

  function submitFilterHandler() {
    dispatch(filterJobsAction({ jobFilter }))
  }

  function resetFilterHandler() {
    dispatch(resetFilterJobsAction())
  }

  return (
    <div className="inner-column">
      <div className="filters-outer" style={{minHeight: '100%'}}>
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        {/* End .close filter */}

        <div className="filter-block">
          <h4>{t('filter_search_h4')}</h4>
          <div className="form-group">
            <SearchBox />
          </div>
        </div>
        {/* <!-- Filter Block --> */}

        <div className="filter-block">
          <h4>{t('filter_workplace_h4')}</h4>
          <div className="form-group">
            <Categories />
          </div>
        </div>
        {/* <!-- Filter Block --> */}

        <div className="filter-block">
          <h4>{t('filter_job_type_h4')}</h4>
          <div className="form-group">
            <JobType />
          </div>
        </div>
        {/* <!-- Switchbox Outer --> */}
       
        <div className="filter-block">
          <h4>{t('filter_specialisms_h4')}</h4>
          <div className="form-group">
            <Tag />
          </div>
        </div>
        {/* <!-- Switchbox Outer --> */}

        <div className="filter-block">
          <h4>{t('filter_experience_h4')}</h4>
          <div className="form-group">
            <ExperienceLevel />
          </div>
        </div>
        {/* <!-- Checkboxes Ouer --> */}

        <div className="filter-block">
          <h4>{t('filter_salary_h4')}</h4>
          <SalaryRangeSlider />
        </div>
        {/* <!-- Filter Block --> */}

        <div className="row gap-2 mb-2">
          <button type="button" 
              className="col-12 theme-btn btn-style-three fs-6"
              onClick={() => resetFilterHandler()}
          >
            <i className="fa fa-redo me-2" /> {t('filter_button_reset')}
          </button>
          <button type="button" 
              className="col-12 theme-btn btn-style-one fs-6"
              onClick={() => submitFilterHandler()}
          >
            <i className="fa fa-filter me-2" /> {t('filter_button_submit')}
          </button>
        </div>
      </div>
      {/* Filter Outer */}
    </div>
  );
};

export default FilterSidebar;
