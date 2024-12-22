import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios";

const RelatedJobs2 = ({ jobPosition }) => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.post('/api/jobs', { limit: 4, jobFilter: {
      jobPosition, options: true
    }}).then(res => setData(res.data.jobs)).catch(err => console.log("err related jobs - ", err))
  }, [])

  return (
    <>
      {data.map((item) => (
        <div
          className="job-block-four col-xl-3 col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box">
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
                    ? "New graduted"
                    : item.experience === 1
                    ? "1 Year"
                    : item.experience + ' Years'
                  }
                </li>
            </ul>
            <span className="company-logo">
              <img src={item.employer.logo} alt="featured job" />
            </span>
            <span className="company-name">{item.company}</span>
            <h4>
              <Link href={`/job/${item.id}`}>{item.jobTitle}</Link>
            </h4>
            <div className="location">
              <span className="icon flaticon-map-locator"></span>
              {
                item.contact?.country && item.contact.city
                ? item.contact?.country + ', ' + item.contact.city
                : item.contact?.country
                ? item.contact.country
                : item.contact?.city
                ? item.contact.city
                : 'Unknown'
              }
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default RelatedJobs2;
