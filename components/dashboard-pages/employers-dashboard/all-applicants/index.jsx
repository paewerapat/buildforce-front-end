import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getApplicantByEmployer } from "../../../../app/features/employer/applicantSlice";
import axios from "../../../../lib/axios";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import DashboardHeader from "../../../header/DashboardHeader";
import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import ListingShowing from "./components/ListingShowing";
import SkeletonContentBoxLoading from "./components/SkeletonContentBoxLoading";
import SkeletonFilterBoxLoading from "./components/SkeletonFilterBoxLoading";
import WidgetContentBox from "./components/WidgetContentBox";
import WidgetTopFilterBox from "./components/WidgetTopFilterBox";
import { useTranslation } from "react-i18next";


const queryClient = new QueryClient()

function FetchAllJobAllApplicantData({ employerInfo }) {
  
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchAllJobsAllApplicantData'],
    queryFn: () => axios.post('/api/employers/job/all', { id: employerInfo?.id })
      .then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonFilterBoxLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) return (
    <WidgetTopFilterBox job={data} />
  )
}

function FetchAllApplicantByEmployerData({ employerInfo }) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchAllApplicantByEmployerData'],
    queryFn: () => axios.post('/api/applicants/employer/all', { id: employerInfo?.id })
      .then((res) => res.data)
  })

  useQuery({
    queryKey: ['getApplicantByEmployer'],
    queryFn: () => axios.post(`/api/applicants/employer`, {id: employerInfo?.id})
      .then((res) => {
        dispatch(getApplicantByEmployer(res.data))
        return res.data
      })
  })


  if (isPending || isFetching) return <SkeletonContentBoxLoading />
  if (error) return 'An error has occurred: ' + error.message
  return (
    <WidgetContentBox allApplicant={data} />
  )
}


const Index = () => {

  const { t } = useTranslation('dashboard/employer/all_applicants')
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

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>{t('title_h4')}</h4>
                    
                    <QueryClientProvider client={queryClient}>
                      <FetchAllJobAllApplicantData employerInfo={employerInfo} />
                    </QueryClientProvider>
                  </div>
                  {/* End top widget filter bar */}

                  <QueryClientProvider client={queryClient}>
                    <FetchAllApplicantByEmployerData employerInfo={employerInfo} />
                  </QueryClientProvider>
                  
                  {/* End widget-content */}
                </div>

                <ListingShowing />
              </div>
            </div>
          </div>
          {/* End .row */}
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
