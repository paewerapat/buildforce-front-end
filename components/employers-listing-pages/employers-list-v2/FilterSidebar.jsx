import { useDispatch, useSelector } from "react-redux";
import { filterEmployerListingAction, resetEmployerFilterAction } from "../../../app/actions/employerAction";
import Categories from "../components/Categories";
import SearchBox from "../components/SearchBox";
import { useTranslation } from "react-i18next";

const FilterSidebar = () => {

    const { t } = useTranslation('employers')
    const dispatch = useDispatch();
    const { employerFilter } = useSelector(state => state);

    function resetFilterHandler() {
        dispatch(resetEmployerFilterAction())
    }

    function submitFilterHandler() {
        dispatch(filterEmployerListingAction({employerFilter}))
    }

    return (
        <div className="inner-column pd-right">
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
                    <h4>{t('filter_category_h4')}</h4>
                    <div className="form-group">
                        <Categories />
                    </div>
                </div>
                {/* <!-- Filter Block --> */}

                <div className="row gap-2">
                    <button type="reset" 
                        className="col-12 theme-btn btn-style-three fs-6"
                        onClick={() => resetFilterHandler()}
                    >
                        <i className="fa fa-redo me-2" /> {t('filter_button_reset')}
                    </button>
                    <button type="submit" 
                        onClick={submitFilterHandler}
                        className="col-12 theme-btn btn-style-one fs-6"
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
