import Link from "next/link.js";
import { useState } from "react";
import ListingShowing from "./ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { deleteEmployerShortlistedAction } from "../../../../../app/actions/candidateAction";
import { CircularProgress } from "@mui/material";
const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT || 10;

const EmployerFavouriteTable = ({ t }) => {
  const { employers: data } = useSelector(
    (state) => state.shortlistedByCandidate
  );
  const result = data?.length || 0;
  const [page, setPage] = useState(1);

  const { update: sessionUpdate } = useSession();
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);
  const { candidateInfo } = useSelector((state) => state.user);

  async function deleteShortlistedHandler(employerId) {
    const updateType = "delete";
    const body = { shortlisted: employerId, id: candidateInfo.id };
    dispatch(deleteEmployerShortlistedAction({ body, updateType }));
    await sessionUpdate();
  }

  return (
    <>
      <div className="tabs-box">
        <div className="widget-title">
          <h4>{t("title_employers_h4")}</h4>
        </div>
        {/* End filter top bar */}

        {/* Start table widget content */}
        <div className="widget-content">
          <div className="table-outer">
            <div className="table-outer">
              <table className="default-table manage-job-table">
                <thead>
                  <tr>
                    <th>{t("table_profile")}</th>
                    <th>{t("table_contact")}</th>
                    <th>{t("table_industry")}</th>
                    <th>{t("table_action")}</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.slice(0, page * limit).map((item) => (
                    <tr key={item.id}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <img src={item.logo} alt="logo" />
                              </span>
                              <h4>
                                <Link href={`/employers/${item.id}`}>
                                  {item.companyName}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item.industry}
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
                      <td className="d-flex flex-column gap-1">
                        <div className="d-flex flex-row gap-1">
                          <span className="icon flaticon-email"></span>
                          {item.contactEmail}
                        </div>
                        <div className="d-flex flex-row gap-1">
                          <span className="icon flaticon-phone"></span>
                          {item.phone}
                        </div>
                      </td>
                      <td className="status">{item.industry}</td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                className="bg-warning"
                                data-text={t("Delete Shortlisted")}
                                onClick={() =>
                                  deleteShortlistedHandler(item.id)
                                }
                              >
                                {alert.loading ? (
                                  <CircularProgress />
                                ) : (
                                  <span className="la la-bookmark text-light"></span>
                                )}
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

export default EmployerFavouriteTable;
