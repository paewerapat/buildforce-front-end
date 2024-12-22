import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ListingShowing from "../components/ListingShowing";
import moment from 'moment'
import { resetEmployerFilterAction, sortDateFilterEmployerAction } from "../../../app/actions/employerAction";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const FilterTopBox = () => {

    const { t } = useTranslation('employers')
    const { employer } = useSelector(state => state)
    const sortDate = useRef();

    const {
        companyName,
        industry,
    } = useSelector((state) => state.employerFilter) || {};
    const dispatch = useDispatch();

    let content = employer.data
        ?.map((company) => (
            <div
                className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12"
                key={company.id}
            >
                <div className="inner-box">

                    <div className="content-inner">
                        <span className="featured">Featured</span>
                        <span className="company-logo">
                            <img src={company.logo} alt="company brand" />
                        </span>
                        <h4>
                            <Link href={`/employers/${company.id}`}>
                                {company.companyName}
                            </Link>
                        </h4>
                        <ul className="job-info flex-column">
                            <li className="me-0">
                                <span className="icon flaticon-map-locator"></span>
                                {
                                    company.contact?.country && company.contact.city
                                    ? company.contact?.country + ', ' + company.contact.city
                                    : company.contact?.country
                                    ? company.contact.country
                                    : company.contact?.city
                                    ? company.contact.city
                                    : 'Unknown'
                                }
                            </li>
                            <li className="me-0">
                                <span className="icon flaticon-briefcase"></span>
                                {company.industry}
                            </li>
                        </ul>
                    </div>

                    <div className="job-type me-0">
                        Founded – {moment(company.founded).format('LL')}
                    </div>
                </div>
            </div>
        ));

    // clear handler
    const clearAll = () => {
        dispatch(resetEmployerFilterAction());
    };

    function sortDateFilterHandler(value) {
        sortDate.current = value;
        dispatch(sortDateFilterEmployerAction(value))
    }

    return (
        <>
            <div className="ls-switcher">
                <div className="showing-result">
                    <div className="show-1023">
                        <button
                            type="button"
                            className="theme-btn toggle-filters "
                            data-bs-toggle="offcanvas"
                            data-bs-target="#filter-sidebar"
                        >
                            <span className="icon icon-filter"></span> {t('filter_button_show')}
                        </button>
                    </div>
                    <div className="text">
                        <strong>{content?.length}</strong> {t('showing_result_text')}
                    </div>
                </div>
                {/* End showing-result */}
                <div className="sort-by">
                    {companyName !== "" ||
                    industry !== ""
                    ? (
                        <button
                            onClick={clearAll}
                            className="btn btn-danger text-nowrap me-2"
                            style={{
                                minHeight: "45px",
                                marginBottom: "15px",
                            }}
                        >
                            {t('sort_by_clear')}
                        </button>
                    ) : undefined}

                    <select
                        className="chosen-single form-select"
                        ref={sortDate}
                        onChange={(e) => sortDateFilterHandler(e.target.value)}
                    >
                        <option value="-">{t('sort_date_latest')}</option>
                        <option value="+">{t('sort_date_oldest')}</option>
                    </select>
                    {/* End select */}

                </div>
            </div>
            {/* End top filter bar box */}

            <div className="row">{content}</div>
            {/* End .row */}

            {
                employer?.data?.length > 0 && <ListingShowing />
            }
            {/* <!-- Pagination --> */}
        </>
    );
};

export default FilterTopBox;
