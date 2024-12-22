import moment from 'moment';
import Link from "next/link.js";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllNotifyAction, deleteNotifyAction, getNotifyAction, isReadNotifyAction } from "../../../../../app/actions/notifyAction.js";
import { setFilterNotify } from "../../../../../app/features/notifySlice.js";

const JobAlertsTable = ({ t }) => {
  
  const dispatch = useDispatch();
  const { user, notify } = useSelector(state => state);
  const selectFilter = useRef();

  function selectFilterHandler(value) {
    selectFilter.current = value
    dispatch(setFilterNotify(value))
    dispatch(getNotifyAction({ type: 'candidate', id: user?.candidateInfo?.id, filter: value}))
  }

  function updateNotificationHandler(id) {
    dispatch(isReadNotifyAction({id}))
  }

  function deleteAllNotificationHandler() {
    if(data.length === 0) return toast.error("Don't have data to delete")
    dispatch(deleteAllNotifyAction({id: user?.candidateInfo?.id}))
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t('title_h4')}</h4>

        <div className="col text-end ms-auto me-3">
          <button type='button' className='btn btn-danger mb-1' onClick={deleteAllNotificationHandler}>
            <i className="fa fa-trash"></i> {t('button_clear_all')}
          </button>
        </div>
        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select"
            ref={selectFilter}
            onChange={(e) => selectFilterHandler(e.target.value)}
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
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>{t('table_title')}</th>
                  <th>{t('table_event')}</th>
                  <th>{t('table_created')}</th>
                  <th>{t('table_action')}</th>
                </tr>
              </thead>

              <tbody>
                {notify.data?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img src={item.user.logo} alt="logo" />
                            </span>
                            <h4>
                              {item.content}
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.user.industry}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {
                                  item.user.contact?.country && item.user.contact.city
                                  ? item.user.contact?.country + ', ' + item.user.contact.city
                                  : item.user.contact?.country
                                  ? item.user.contact.country
                                  : item.user.contact?.city
                                  ? item.user.contact.city
                                  : 'Unknown'
                                }
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.user.companyName} {item.text}</td>
                    <td>{moment(item.createdAt).fromNow()}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link href={item.url} onClick={() => updateNotificationHandler(item.id)}>
                              <button data-text={t("View Job")} type="button">
                                <span className="la la-eye"></span>
                              </button>
                            </Link>
                          </li>
                          <li>
                            <button data-text={t("Delete Notify")} type='button' onClick={() => dispatch(deleteNotifyAction({id: item.id}))}>
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
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobAlertsTable;
