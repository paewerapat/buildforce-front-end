import moment from "moment/moment.js";
import { useTranslation } from "react-i18next";

const JobOverView2 = ({ data }) => {

  const { t } = useTranslation('job_id')

  return (
    <ul>
      <li>
        <i className="icon icon-calendar"></i>
        <h5>{t('job_overview_posted')}:</h5>
        <span>{moment(data?.createdAt).format('LL')}</span>
      </li>
      <li>
        <i className="icon icon-expiry"></i>
        <h5>{t('job_overview_expired')}:</h5>
        <span>{moment(data?.expiredDate).fromNow()}</span>
      </li>
      <li>
        <i className="icon icon-location"></i>
        <h5>{t('job_overview_location')}:</h5>
        <span>
          {
            data?.contact?.country && data?.contact.city
            ? data?.contact?.country + ', ' + data?.contact.city
            : data?.contact?.country
            ? data?.contact.country
            : data?.contact?.city
            ? data?.contact.city
            : t('unknown')
          }
        </span>
      </li>
      <li>
        <i className="icon icon-user-2"></i>
        <h5>{t('job_overview_position')}:</h5>
        <span>{data?.jobPosition}</span>
      </li>
      <li>
        <i className="icon icon-clock"></i>
        <h5>{t('job_overview_qualification')}:</h5>
        <span>{data?.qualification}</span>
      </li>
      <li>
        <i className="icon icon-rate"></i>
        <h5>{t('job_overview_rate')}:</h5>
        <span>${(data?.salary / 30 / 8).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} / hour</span>
      </li>
      <li>
        <i className="icon icon-salary"></i>
        <h5>{t('job_overview_salary')}:</h5>
        <span>${data?.salary?.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span>
      </li>
    </ul>
  );
};

export default JobOverView2;
