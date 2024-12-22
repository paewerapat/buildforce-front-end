import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import { useTranslation } from "react-i18next";

const RelatedJobs = ({ id }) => {
    
  const { t } = useTranslation('employer_id')
  const [data, setData] = useState([])

  useEffect(() => {
    axios.post('/api/employers/job', { employer: id, limit: 3 }).then(res =>
      setData(res.data.jobs)  
    ).catch(err => console.log("[err]employer related job - ", err))
  }, [])
  
  return (
    <>
    <div className="title-box">
      <h3>{data.length} {t('others_jobs_available')}</h3>
      {/* <div className="text">
        2020 jobs live - 293 added today.
      </div> */}
    </div>
    {/* End .title-box */}
      {data.map((item) => (
        <div className="job-block" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img src={item.employer.logo} alt="resource" />
              </span>
              <h4>
                <Link href={`/job/${item.id}`}>{item.jobTitle}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.companyName}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {
                    item.contact?.country && item.contact.city
                    ? item.contact?.country + ', ' + item.contact.city
                    : item.contact?.country
                    ? item.contact.country
                    : item.contact?.city
                    ? item.contact.city
                    : t('Unknown')
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
                  {item.workplaceModes}
                </li>
                <li className={`privacy`}>
                  {item.employmentType}
                </li>
                <li className={`required`}>
                  {
                    item.experience === 0
                    ? t("New graduted")
                    : item.experience === 1
                    ? t("1 Year")
                    : item.experience + ' ' + t('Years')
                  }
                </li>
              </ul>
              {/* End .job-other-info */}
              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RelatedJobs;
