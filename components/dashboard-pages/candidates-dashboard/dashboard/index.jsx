import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import CopyrightFooter from "../../CopyrightFooter";
import JobApplied from "./components/JobApplied";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import NoCandidateProfile from "../NoCandidateProfile";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";
import SkeletonStaticsLoading from "./components/SkeletonStaticsLoading";
import SkeletonRecentApplicantLoading from "../../employers-dashboard/dashboard/components/SkeletonRecentApplicantLoading";
import SkeletonNotificationLoading from "../../employers-dashboard/dashboard/components/SkeletonNotificationLoading";
import { getRecentApplicantDashboard, getRecentNotifyDashboard, getStatisticsDashboard } from "../../../../app/features/candidate/dashboardSlice";
import { useTranslation } from "react-i18next";


const queryClient = new QueryClient()

function FetchStaticsData({ candidateInfo }) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchStaticsCandidateData'],
    queryFn: () => axios.post('/api/candidates/dashboard', { 
      id: candidateInfo?.id, position: candidateInfo?.jobPosition
    }).then(({ data }) => {
      dispatch(getStatisticsDashboard(data))
      return data
    })
  })

  if (isPending || isFetching) return <SkeletonStaticsLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) 

  return (
    <TopCardBlock />
  )
}

function FetchRecentApplicantData({candidateInfo}) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchRecentApplicantCandidateData'],
    queryFn: () => axios.post('/api/applicants/candidate', { 
      id: candidateInfo?.id, limit: 6
    }).then(({ data }) => {
      dispatch(getRecentApplicantDashboard(data))
      return data
    })
  })

  if (isPending || isFetching) return <SkeletonRecentApplicantLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) 
  return (
    <JobApplied />
  )
}

function FetchRecentNotificationData({candidateInfo}) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchRecentNotifyCandidateData'],
    queryFn: () => axios.post('/api/notify/candidate', {
      id: candidateInfo?.id, limit: 5
    }).then(({ data }) => {
      dispatch(getRecentNotifyDashboard(data))
      return data
    })
  })

  if (isPending || isFetching) return <SkeletonNotificationLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) 

  return (
    <Notification />
  )
}

const Index = () => {

  const { t } = useTranslation('dashboard/candidate/dashboard')
  const { candidateInfo } = useSelector(state => state.user);

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title={t('bread_crumb')} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <QueryClientProvider client={queryClient}>
              <FetchStaticsData candidateInfo={candidateInfo} />
            </QueryClientProvider>
          </div>
          {/* End .row top card block */}

          <div className="row">
            {
              !candidateInfo?.id
              ?
              <NoCandidateProfile />
              :
              <>
              <div className="col-xl-7 col-lg-12">
                {/* <!-- Graph widget --> */}
                <div className="graph-widget ls-widget">
                  <ProfileChart />
                </div>
              </div>
              {/* End .col */}

              <div className="col-xl-5 col-lg-12">
                {/* <!-- Notification Widget --> */}
                <div className="notification-widget ls-widget">
                  <div className="widget-title">
                    <h4>{t('notification_title_h4')}</h4>
                  </div>
                  <div className="widget-content">
                    <QueryClientProvider client={queryClient} >
                      <FetchRecentNotificationData candidateInfo={candidateInfo} />
                    </QueryClientProvider>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-12">
                {/* <!-- applicants Widget --> */}
                <div className="applicants-widget ls-widget">
                  <div className="widget-title">
                    <h4>{t('applicants_title_h4')}</h4>
                  </div>
                  <div className="widget-content">
                    <div className="row">
                      {/* <!-- Candidate block three --> */}

                      <QueryClientProvider client={queryClient}>
                        <FetchRecentApplicantData candidateInfo={candidateInfo} />
                      </QueryClientProvider>
                    </div>
                  </div>
                </div>
              </div>
              </>
            }
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
