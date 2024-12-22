import Link from "next/link";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterJobsAction, sortDateFilterJobsAction } from "../../../app/actions/jobAction";
import ListingShowing from "../components/ListingShowing";
import { useTranslation } from "react-i18next";

const FilterJobsBox = () => {

    const { t } = useTranslation('jobs')
    const { jobTitle, jobPosition, workplaceModes, salary, experience } = useSelector((state) => state.jobFilter);
    const { job } = useSelector(state => state);
    const sortDate = useRef();

    const dispatch = useDispatch();

    let content = job
        .data?.map((item) => (
            <div
                className="job-block-four col-lg-6 col-md-6 col-sm-12"
                key={item.id}
            >
                <div className="inner-box">
                    <ul className="job-other-info">
                        <li className="privacy">
                            {item.workplaceModes}
                        </li>
                        <li className="time">
                            {item.employmentType}
                        </li>
                        <li className="required">
                            {
                                item.experience === 0
                                ? 'New graduated'
                                : item.experience === 1
                                ? '1 Year'
                                : item.experience + ' Years'
                            }
                        </li>
                    </ul>
                    <span className="company-logo">
                        <img src={item.employer.logo} alt="Logo-Employers" />
                    </span>
                    <span className="company-name">{item.employer?.companyName}</span>
                    <h4 className="mb-2 text-capitalize">
                        <Link href={`/job/${item.id}`}>
                            {item.jobTitle}
                        </Link>
                    </h4>
                    <small className="salary text-success d-flex gap-1 justify-content-center" style={{fontWeight: '500'}}>
                        <span className="fa fa-money-bill"></span> {item.salary.toLocaleString()}
                    </small>
                    <div className="location">
                        <span className="icon flaticon-map-locator"></span>
                        {
                            item.contact?.country && item.contact?.city
                            ? item.contact.country + ', ' + item.contact.city
                            : item.contact?.country
                            ? item.contact.country
                            : item.contact?.city
                            ? item.contact.city
                            : 'Unknown'
                        }
                    </div>
                    <ul className="post-tags">
                        {item?.specialisms?.map((val, i) => (
                            <li key={i}>
                                <a href="#">{val}</a>
                            </li>
                        )).slice(0, 2)}
                        {
                            item.specialisms?.length > 3 &&
                            <li className="colored">+{item.specialisms.length - 3}</li>
                        }
                    </ul>
                </div>
            </div>
            // End all jobs
        ));

    // clear all filters
    const clearAll = () => {
        dispatch(resetFilterJobsAction());
    };

    function sortDateFilterHandler(value) {
        sortDate.current = value;
        dispatch(sortDateFilterJobsAction(value))
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
                    {/* Collapsible sidebar button */}

                    <div className="text">
                        {t('showing_result_text')} <strong>{content?.length}</strong> {t('showing_result_text_tail')}
                    </div>
                </div>
                {/* End showing-result */}

                <div className="sort-by">
                    {
                    jobTitle !== "" ||
                    jobPosition !== "" ||
                    workplaceModes !== "" ||
                    experience !== "" ||
                    salary.min !== 0 || salary.max !== 1000000 ? (
                        <button
                            onClick={clearAll}
                            className="btn btn-danger text-nowrap me-2"
                            style={{ minHeight: "45px", marginBottom: "15px" }}
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
                job?.data?.length > 0 && <ListingShowing />
            }
            {/* <!-- End Pagination --> */}
        </>
    );
};

export default FilterJobsBox;
