import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { getShortlistedByCandidate } from "../../../../app/features/candidate/shortlistedSlice";
import axios from "../../../../lib/axios";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import NoCandidateProfile from "../NoCandidateProfile";
import EmployerFavouriteTable from "./components/EmployerFavouriteTable";
import JobFavouriteTable from "./components/JobFavouriteTable";
import SkeletonLoading from "./components/SkeletonLoading";

const queryClient = new QueryClient();

function FetchData({ candidateInfo }) {
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["fetchShortlistedCandidateData"],
    queryFn: () =>
      axios
        .post(`/api/candidates/shortlisted`, { id: candidateInfo?.id })
        .then((res) => res.data),
  });

  if (isFetching || isPending) return <SkeletonLoading />;
  if (error) return "An error has occurred: " + error.message;
  if (data) dispatch(getShortlistedByCandidate(data));
}

const Index = ({ t }) => {

  const { candidateInfo } = useSelector((state) => state.user);

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
          <BreadCrumb title={t("bread_crumb")} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}
          {!candidateInfo?.id ? (
            <NoCandidateProfile />
          ) : (
            <Tabs>
              <TabList
                style={{ position: "relative", bottom: "-10px" }}
                className="btn-box d-flex gap-2"
              >
                <Tab
                  className="theme-btn btn-style-four"
                  selectedClassName="bg-white"
                  style={{ cursor: "pointer" }}
                >
                  <i className="la la-briefcase me-1"></i> {t('Jobs')}
                </Tab>

                <Tab
                  className="theme-btn btn-style-four"
                  selectedClassName="bg-white"
                  style={{ cursor: "pointer" }}
                >
                  <i className="la la-user me-1"></i> {t('Employers')}
                </Tab>
              </TabList>
              {/* End .form-group */}
              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Ls widget --> */}
                  <div className="ls-widget">
                    <TabPanel>
                      <QueryClientProvider client={queryClient}>
                        <JobFavouriteTable t={t} >
                          <FetchData candidateInfo={candidateInfo} />
                        </JobFavouriteTable>
                      </QueryClientProvider>
                    </TabPanel>
                    {/* End cadidates Form */}

                    <TabPanel>
                      <EmployerFavouriteTable t={t} />
                    </TabPanel>

                    {/* End Employer Form */}
                  </div>
                </div>
              </div>
            </Tabs>
          )}
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
