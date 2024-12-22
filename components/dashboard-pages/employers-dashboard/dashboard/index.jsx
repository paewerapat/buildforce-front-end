import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import Applicants from "./components/Applicants";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import NoEmployerProfile from "../NoEmployerProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../lib/axios";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getRecentApplicantDashboard, getRecentNotificationDashboard, getStatisticsDashboard } from "../../../../app/features/employer/dashboardSlice";
import SkeletonStaticsLoading from "./components/SkeletonStaticsLoading";
import SkeletonRecentApplicantLoading from "./components/SkeletonRecentApplicantLoading";
import SkeletonNotificationLoading from "./components/SkeletonNotificationLoading";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient()

function FetchStaticsData({employerInfo}) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchStaticsEmployerData'],
    queryFn: () => axios.post('/api/employers/dashboard', { id: employerInfo?.id })
      .then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonStaticsLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getStatisticsDashboard(data))

  return (
    <TopCardBlock />
  )
}

function FetchRecentApplicantData({employerInfo}) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchRecentApplicantEmployerData'],
    queryFn: () => axios.post('/api/applicants/employer', { 
      id: employerInfo?.id, limit: 6
    }).then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonRecentApplicantLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getRecentApplicantDashboard(data))

  return (
    <Applicants />
  )
}

function FetchRecentNotificationData({employerInfo}) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchRecentNotifyEmployerData'],
    queryFn: () => axios.post('/api/notify/employer', {
      id: employerInfo?.id, limit: 6
    }).then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonNotificationLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getRecentNotificationDashboard(data))

  return (
    <Notification />
  )
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/dashboard')
  const { employerInfo } = useSelector(state => state.user)

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title={t('bread_crumb')} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <QueryClientProvider client={queryClient}>
            <FetchStaticsData employerInfo={employerInfo} />
          </QueryClientProvider>
          {/* End .row top card block */}

          <div className="row">
            {
              !employerInfo?.id
              ?
              <NoEmployerProfile />
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
                      <h4>{t('notifications')}</h4>
                    </div>
                    <div className="widget-content">
                      <QueryClientProvider client={queryClient}>
                        <FetchRecentNotificationData employerInfo={employerInfo}  />
                      </QueryClientProvider>
                    </div>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  {/* <!-- applicants Widget --> */}
                  <div className="applicants-widget ls-widget">
                    <div className="widget-title">
                      <h4>{t('recent_applicants')}</h4>
                    </div>
                    <div className="widget-content">
                      {/* <!-- Candidate block three --> */}
                      <QueryClientProvider client={queryClient}>
                        <FetchRecentApplicantData employerInfo={employerInfo} />
                      </QueryClientProvider>
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
