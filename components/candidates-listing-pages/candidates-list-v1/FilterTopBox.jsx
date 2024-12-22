import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterCandidatesAction, sortDateFilterCandidateAction } from "../../../app/actions/candidateAction";
import ListingShowing from "../components/ListingShowing";
import { useTranslation } from "react-i18next";

const FilterTopBox = () => {

    const { t } = useTranslation('candidates')
    const router = useRouter();
    const { candidate } = useSelector(state => state);
    const { jobPosition, fullName, experience, qualification } = useSelector(state => state.candidateFilter)
    const sortDate = useRef();

    const dispatch = useDispatch();


    let content = candidate.data
        ?.map((candidate) => (
            <div className="candidate-block-three" key={candidate.id}>
                <div className="inner-box">
                    <div className="content">
                        <figure className="image">
                            <img src={candidate.avatar} alt="candidates" />
                        </figure>
                        <h4 className="name">
                            <Link
                                href={`/candidates/${candidate.id}`}
                                style={{textTransform: 'capitalize'}}
                            >
                                {candidate.fullName}
                            </Link>
                        </h4>

                        <ul className="candidate-info">
                            <li className="designation">
                                {candidate.jobPosition}
                            </li>
                            <li>
                                <span className="icon flaticon-map-locator"></span>{" "}
                                {
                                    candidate.contact?.country && candidate.contact.city
                                    ? candidate.contact?.country + ', ' + candidate.contact.city
                                    : candidate.contact?.country
                                    ? candidate.contact.country
                                    : candidate.contact?.city
                                    ? candidate.contact.city
                                    : t('Unknown')
                                }
                            </li>
                            <li className="text-success">
                                <span className="icon flaticon-money text-success"></span> $
                                {candidate.expectedSalary.toLocaleString(0)}
                            </li>
                            <li>
                                <span className="icon flaticon-briefcase"></span>
                                {
                                    candidate.experience === 0
                                    ? t('New graduated')
                                    : candidate.experience === 1
                                    ? t('1 Year')
                                    : candidate.experience + ' ' + t('Years')
                                }
                            </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                            {candidate.specialisms.map((val, i) => (
                                <li key={i}>
                                    <button 
                                        type="button"
                                        onClick={() => router.push(`/job?specialisms=${val}&options=true`)}
                                    >{val}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* End content */}

                    <div className="btn-box">
                        {/* <button className="bookmark-btn me-2">
                            <span className="flaticon-bookmark"></span>
                        </button> */}

                        <Link
                            href={`/candidates/${candidate.id}`}
                            className="theme-btn btn-style-three"
                        >
                            <span className="btn-title">{t('button_view_profile')}</span>
                        </Link>
                    </div>
                    {/* End btn-box */}
                </div>
            </div>
        ));

    // clear handler
    const clearHandler = () => {
        dispatch(resetFilterCandidatesAction());
    };

    function sortDateFilterHandler(value) {
        sortDate.current = value
        dispatch(sortDateFilterCandidateAction(value))
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
                        <strong>{content?.length || 0}</strong> {t('showing_result_text')}
                    </div>
                </div>
                {/* End showing-result */}

                <div className="sort-by">
                    {
                    fullName ||
                    jobPosition ||
                    qualification ||
                    experience
                    ? (
                        <button
                            className="btn btn-danger text-nowrap me-2"
                            style={{ minHeight: "45px", marginBottom: "15px" }}
                            onClick={clearHandler}
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

            {content}

            {candidate?.data?.length > 0 && <ListingShowing />}
            {/* <!-- Listing Show More --> */}
        </>
    );
};

export default FilterTopBox;
