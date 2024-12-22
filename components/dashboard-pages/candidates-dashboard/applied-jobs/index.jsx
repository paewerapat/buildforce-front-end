import MobileMenu from "../../../header/MobileMenu";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import JobListingsTable from "./components/JobListingsTable";
import MenuToggler from "../../MenuToggler";
import ListingShowing from "./components/ListingShowing";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";
import SkeletonLoading from "./components/SkeletonLoading";
import { getApplicantByCandidate } from "../../../../app/features/candidate/applicantSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient()

function FetchAppliedJobData({ candidateInfo }) {
  
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchAppliedJobData'],
    queryFn: () => axios.post(`/api/applicants/candidate`, { id: candidateInfo?.id })
      .then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getApplicantByCandidate(data))

  return (
    <JobListingsTable />
  )
}


const Index = () => {

  const { t } = useTranslation('dashboard/candidate/applied_jobs')
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
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <QueryClientProvider client={queryClient}>
                  <FetchAppliedJobData candidateInfo={candidateInfo} />
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
