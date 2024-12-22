import { useDispatch, useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { getApplicantByEmployerAction } from "../../../../../app/actions/employer/applicantAction";
import { setFilterStatusApplicantByEmployer } from "../../../../../app/features/employer/applicantSlice";
import Applicants from "./Applicants";
import { useTranslation } from "react-i18next";

const WidgetContentBox = ({ allApplicant }) => {

  const { t } = useTranslation('dashboard/employer/all_applicants')
  const dispatch = useDispatch()
  const { applicantByEmployer: applicants, user } = useSelector(state => state)

  function getDataByTabHandler(status) {
    dispatch(setFilterStatusApplicantByEmployer(status))
    dispatch(getApplicantByEmployerAction({ filter: { status }, id: user?.employerInfo?.id }))
  }

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>{t('widget_content_h6')}</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals" onClick={() => getDataByTabHandler('')}>
                {t('Total')}: {allApplicant.length}
              </Tab>
              <Tab className="tab-btn approved" onClick={() => getDataByTabHandler('Approved')}>
                {t('Approved')}: {allApplicant.filter(item => item.status === "Approved").length}
              </Tab>
              <Tab className="tab-btn rejected" onClick={() => getDataByTabHandler('Rejected')}>
                {t('Rejected')}: {allApplicant.filter(item => item.status === "Rejected").length}
              </Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                {applicants.data?.map((item) => (
                  <Applicants data={item} key={item.id} />
                ))}
              </div>
            </TabPanel>
            {/* End total applicants */}

            <TabPanel>
              <div className="row">
                {applicants.data?.map((item) => (
                  <Applicants data={item} key={item.id} />
                ))}
              </div>
            </TabPanel>
            {/* End approved applicants */}

            <TabPanel>
              <div className="row">
                {applicants.data?.map((item) => (
                  <Applicants data={item} key={item.id} />
                ))}
              </div>
            </TabPanel>
            {/* End rejected applicants */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
