import { useDispatch, useSelector } from "react-redux";
import { filterCandidatesListingAction, resetFilterCandidatesAction } from "../../../app/actions/candidateAction";
import Categories from "../components/Categories";
import Experience from "../components/Experience";
import Qualification from "../components/Qualification";
import SearchBox from "../components/SearchBox";
import { useTranslation } from "react-i18next";

const FilterSidebar = () => {

    const { t } = useTranslation('candidates')
    const { candidateFilter } = useSelector(state => state)
    const dispatch = useDispatch()

    function submitFilterHandler() {
        dispatch(filterCandidatesListingAction({candidateFilter, page: 1}))
    }

    function resetFilterHandler() {
        dispatch(resetFilterCandidatesAction())
    }

    return (
        <div className="inner-column pd-right" onSubmit={() => submitFilterHandler()}>
            <div className="filters-outer">
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
                    <h4>{t('filter_job_position_h4')}</h4>
                    <div className="form-group">
                        <Categories />
                    </div>
                </div>
                {/* <!-- Filter Block --> */}

                <div className="filter-block">
                    <h4>{t('filter_experience_h4')}</h4>
                    <div className="form-group">
                        <Experience />
                    </div>
                </div>
                {/* <!-- Filter Block --> */}

                <div className="filter-block">
                    <h4>{t('filter_qualification_h4')}</h4>
                    <div className="form-group">
                        <Qualification />
                    </div>
                </div>
                {/* <!-- Filter Block --> */}

                <div className="row gap-2">
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
