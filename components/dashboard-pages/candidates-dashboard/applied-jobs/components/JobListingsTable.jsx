import Link from "next/link.js";
import moment from "moment/moment.js";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicantByCandidateAction } from "../../../../../app/actions/candidate/applicantAction.js";
import { useTranslation } from "react-i18next";

const JobListingsTable = () => {
  const { t } = useTranslation("dashboard/candidate/applied_jobs");
  const dispatch = useDispatch();
  const { user, applicantByCandidate: applicants } = useSelector(
    (state) => state
  );
  const filterSelect = useRef();

  function selectFilterHandler(value) {
    filterSelect.current = value;
    dispatch(
      getApplicantByCandidateAction({
        id: user?.candidateInfo?.id,
        filter: value,
      })
    );
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t("title_h4")}</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select
            className="chosen-single form-select"
            ref={filterSelect}
            onChange={(e) => selectFilterHandler(e.target.value)}
          >
            <option value={"-"}>{t("latest")}</option>
            <option value={"+"}>{t("oldest")}</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>{t("table_job_title")}</th>
                  <th>{t("table_date_applied")}</th>
                  <th>{t("table_status")}</th>
                  <th>{t("table_action")}</th>
                </tr>
              </thead>

              <tbody className="position-relative">
                {applicants.data?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img src={item.employer.logo} alt="logo" />
                            </span>
                            <h4>
                              <Link href={`/job/${item.job.id}`}>
                                {item.job.jobTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.job.employmentType}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item.employer.contact?.country &&
                                item.employer.contact.city
                                  ? item.employer.contact?.country +
                                    ", " +
                                    item.employer.contact.city
                                  : item.employer.contact?.country
                                  ? item.employer.contact.country
                                  : item.employer.contact?.city
                                  ? item.employer.contact.city
                                  : "Unknown"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {moment(item.createdAt).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td
                      className={`status ${
                        item.status === "Active"
                          ? "text-warning"
                          : item.status === "Rejected"
                          ? "text-danger"
                          : ""
                      }`}
                    >
                      {t(item.status)}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link href={`/job/${item.job.id}`}>
                              <button
                                type="button"
                                data-text={t("table_button_view")}
                              >
                                <span className="la la-eye"></span>
                              </button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
