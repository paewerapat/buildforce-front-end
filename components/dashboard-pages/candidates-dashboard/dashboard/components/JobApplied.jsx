import moment from 'moment';
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

const JobApplied = () => {

  const { t } = useTranslation('common')
  const { recentApplicant } = useSelector(state => state.candidateDashboard)

  return (
    <>
      {recentApplicant?.map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img src={item.employer.logo} alt="item brand" />
              </span>
              <h4>
                <Link href={`/job/${item.id}`}>{item.job.jobTitle}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.employer.companyName}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {
                    item.employer.contact?.country && item.employer.contact.city
                    ? item.employer.contact?.country + ', ' + item.employer.contact.city
                    : item.employer.contact?.country
                    ? item.employer.contact.country
                    : item.employer.contact?.city
                    ? item.employer.contact.city
                    : t('unknown')
                  }
                </li>
                {/* location info */}
                <li>
                  <span className="icon flaticon-clock-3"></span> {moment(item.createdAt).fromNow()}
                </li>
                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span> {item.salary}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}

              <ul className="job-other-info">
                <li className={`time`}>
                  {item.job.employmentType}
                </li>
                <li className={`privacy`}>
                  {item.job.workplaceModes}
                </li>
                <li className={`required`}>
                  {
                    item.job.experience === 0
                    ? t('new_graduates')
                    : item.job.experience === 1
                    ? '1 ' + t('year')
                    : item.job.experience + ' ' + t('years')
                  }
                </li>
              </ul>
              {/* End .job-other-info */}
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default JobApplied;
