import moment from "moment/moment.js";
import Link from "next/link";
import { useRouter } from "next/router.js";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { filterJobsByEmployerAction } from "../../../../../app/actions/employer/jobAction.js";
import axios from "../../../../../lib/axios.js";

const JobListingsTable = () => {

  const { t } = useTranslation('dashboard/employer/manage_job')
  const { jobByEmployer: jobs, user } = useSelector(state => state)
  const dispatch = useDispatch();
  const router = useRouter();
  const sortDate = useRef()

  function sortDateHandler(value) {
    sortDate.current = value;
    dispatch(filterJobsByEmployerAction({ jobFilter: value, employer: user?.employerInfo?.id }))
  }

  async function deleteJobHandler(id, job) {
    if(window.confirm(`Delete ${job} job?`)) {
      
      const { data: response } = await axios.post('/api/employers/job/delete', {
        id: id
      })
      toast.success(response.msg)
      router.replace(router.asPath)
    }
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t('title_h4')}</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select"
            ref={sortDate}
            onChange={(e) => sortDateHandler(e.target.value)}
          >
            <option value={'-'}>{t('latest')}</option>
            <option value={'+'}>{t('oldest')}</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>{t('table_title')}</th>
                <th>{t('table_applicants')}</th>
                <th>{t('table_create_and_expire')}</th>
                <th>{t('table_status')}</th>
                <th>{t('table_action')}</th>
              </tr>
            </thead>

            <tbody>
              {jobs?.data?.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <img src={item?.employer?.logo} alt="logo" />
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
                              {item.contact?.country}, {item.contact?.city}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <a href="#">{item.applied} {t('Applied')}</a>
                  </td>
                  <td>
                    {moment(item.createdAt).format('LLL')} <br />
                    {moment(item.expiredDate).format('LLL')}
                  </td>
                  <td className={`status ${item.display ? '' : 'text-danger'}`}>{item.display ? t('Opened') : t('Closed')}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <Link href={`/job/${item.id}`}>
                            <button data-text={t("View Aplication")}>
                              <span className="la la-eye"></span>
                            </button>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/employers-dashboard/post-jobs?edit=true&id=${item.id}`}>
                            <button data-text={t("Edit Job")}>
                              <span className="la la-pencil"></span>
                            </button>
                          </Link>
                        </li>
                        <li>
                          <button data-text={t("Delete Job")} type="button" onClick={() => deleteJobHandler(item.id, item.jobTitle)}>
                            <span className="la la-trash"></span>
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
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
