import Link from "next/link.js";
import moment from "moment";
import ListingShowing from "./ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { deleteJobShortlistedAction } from "../../../../../app/actions/candidateAction";
const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT || 10;

const JobFavouriteTable = ({ t, children }) => {


  const { update: sessionUpdate } = useSession();
  const dispatch = useDispatch();
  const { candidateInfo } = useSelector((state) => state.user);
  const { jobs: data } = useSelector((state) => state.shortlistedByCandidate);

  const result = data?.length || 0;
  const [page, setPage] = useState(1);

  async function deleteShortlistedHandler(jobId) {
    const updateType = "delete";
    const body = { shortlisted: jobId, id: candidateInfo.id };
    dispatch(deleteJobShortlistedAction({ body, updateType }));
    await sessionUpdate();
  }

  console.log("data - ", data)

  return (
    <>
      <div className="tabs-box">
        <div className="widget-title">
          <h4>{t("title_jobs_h4")}</h4>
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
                <tbody>
                  { children }
                  {data?.slice(0, page * limit).map((item) => (
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
                                <Link href={`/job/${item.id}`}>
                                  {item.jobTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item.jobPosition}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item.contact?.country && item.contact.city
                                    ? item.contact?.country +
                                      ", " +
                                      item.contact.city
                                    : item.contact?.country
                                    ? item.contact.country
                                    : item.contact?.city
                                    ? item.contact.city
                                    : "Unknown"}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{moment(item.expiredDate).format("LLL")}</td>
                      <td className={`status ${item.display ? '' : 'text-danger'}`}>{item.display ? t('Opened') : t('Closed')}</td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                className="bg-warning"
                                data-text={t('Delete Shortlisted')}
                                type="button"
                                onClick={() =>
                                  deleteShortlistedHandler(item.id)
                                }
                              >
                                <span className="la la-bookmark text-light"></span>
                              </button>
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
      <ListingShowing page={page} setPage={setPage} result={result} />
    </>
  );
};

export default JobFavouriteTable;
