import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TopCardBlock = () => {

  const { t } = useTranslation('dashboard/candidate/dashboard')
  const { candidateInfo } = useSelector(state => state.user) 
  const { statApplicant, statJobAlert } = useSelector(state => state.candidateDashboard)

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: statApplicant?.length || 0,
      metaName: "Applied Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: statJobAlert?.length || 0,
      metaName: "Job Alerts",
      uiClass: "ui-red",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: (candidateInfo?.shortlisted?.jobs?.length + candidateInfo?.shortlisted?.employers?.length || 0),
      metaName: "Shortlisted",
      uiClass: "ui-green",
    },
  ];

  return (
    <>
      {cardContent?.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{t(item.metaName)}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
