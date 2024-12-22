import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import JobAlertsTable from "./components/JobAlertsTable";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import ListingShowing from "./components/ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import NoCandidateProfile from "../NoCandidateProfile";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";
import SkeletonLoading from "./components/SkeletonLoading";
import { getNotify } from "../../../../app/features/notifySlice";

const queryClient = new QueryClient()

function FetchData({ candidateInfo, t }) {
  
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchJobAlertsData'],
    queryFn: () => axios.post(`/api/notify/candidate`, { id: candidateInfo?.id })
      .then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonLoading t={t} />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getNotify(data))

  return (
    <JobAlertsTable t={t} />
  )
}

const Index = ({ t }) => {

  const { candidateInfo } = useSelector(state => state.user)

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
            {
              !candidateInfo?.id
              ?
              <NoCandidateProfile />
              :
              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <QueryClientProvider client={queryClient}>
                    <FetchData candidateInfo={candidateInfo} t={t} />
                  </QueryClientProvider>
                  <ListingShowing />
                </div>
              </div>
            }
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
