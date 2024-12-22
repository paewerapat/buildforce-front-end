import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import JobListingsTable from "./components/JobListingsTable";
import MenuToggler from "../../MenuToggler";
import ListingShowing from './components/ListingShowing'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../lib/axios";
import SkeletonLoading from "./components/SkeletonLoading";
import { getJobByEmployer } from "../../../../app/features/employer/jobSlice";
import { useTranslation } from "react-i18next";


const queryClient = new QueryClient()

function FetchData({ employerInfo }) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchManageJobData'],
    queryFn: () => axios.post('/api/employers/job', { employer: employerInfo?.id })
      .then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getJobByEmployer(data))

  return (
    <JobListingsTable />
  )
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/manage_job')
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
                <QueryClientProvider client={queryClient}>
                  <FetchData employerInfo={employerInfo} />
                </QueryClientProvider>
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
