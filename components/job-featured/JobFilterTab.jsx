import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobHomePageAction } from "../../app/actions/home/homeAction";

const JobFilterTab = () => {

  const { homePage } = useSelector(state => state)
  const dispatch = useDispatch();

  const [tabId, setTabId] = useState(2);
  const [tabs, setTab] = useState([
    { id: 1, name: "All", isActive: true },
    { id: 2, name: "New graduated", isActive: false, type: "experience", value: 0 },
    { id: 3, name: "5 Years", isActive: false, type: "experience", value: 5 },
    { id: 4, name: "Full-time", isActive: false, type: "employmentType", value: "Full-time" },
    { id: 5, name: "Remote", isActive: false, type: "workplaceModes", value: "Remote" },
  ]);

  // tab handler
  const tabHandler = (id) => {
    // active tab
    setTab((old) =>
      old?.map((tab) => {
        tab.isActive = false;
        if (tab.id === id) {
          tab.isActive = true;
          dispatch(getJobHomePageAction({filter: tab.value, limit: 6, filterType: tab.type}))
        }
        return tab;
      })
    );
    // set id of tab
    setTabId(id);
  };

  return (
    <>
      {/* <!--Tabs Box--> */}
      <ul className="tab-buttons">
        {tabs?.map((tab) => (
          <li
            onClick={() => tabHandler(tab.id)}
            onKeyDown={() => tabHandler(tab.id)}
            key={tab.id}
            className={`${tab.isActive ? "active-btn" : ""} tab-btn`}
          >
            {tab.name}
          </li>
        ))}
      </ul>

      {/* <!--Tab--> */}
      <div className="tab active-tab" data-aos="fade-up">
        <div className="row">
          {homePage.jobs?.map((item) => (
            <div
              className="job-block col-lg-6 col-md-12 col-sm-12"
              key={item.id}
            >
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={item.employer.logo} alt="item brand" />
                  </span>
                  <h4>
                    <Link href={`/job/${item.id}`}>
                      {item.jobTitle}
                    </Link>
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
                        item.contact?.country && item.contact.city
                        ? item.contact?.country + ', ' + item.contact.city
                        : item.contact?.country
                        ? item.contact.country
                        : item.contact?.city
                        ? item.contact.city
                        : 'Unknown'
                      }
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {moment(item.createdAt).fromNow()}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {item.salary}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                      <li className={`time`}>
                        {
                          item.experience === 0 
                          ? 'New Graduated'
                          : item.experience === 1
                          ? '1 Year'
                          : item.experience === 2
                          ? '2 Years'
                          : item.experience === 3
                          ? '3 Years'
                          : item.experience === 5
                          ? '5 Years'
                          : ''
                        }
                      </li>
                      <li className={`privacy`}>
                        {item.workplaceModes}
                      </li>
                      <li className={`required`}>
                        {item.employmentType}
                      </li>
                  </ul>
                  {/* End .job-other-info */}
                </div>
              </div>
            </div>
            // End job-block
          ))}
        </div>
      </div>
    </>
  );
};

export default JobFilterTab;
