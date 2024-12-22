import { useDispatch, useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import DashboardHeader from "../../../header/DashboardHeader";
import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import NoEmployerProfile from "../NoEmployerProfile";
import ApplicantContentBox from "./components/ApplicantContentBox";
import CandidateContentBox from "./components/CandidateContentBox";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";
import { getShortlistedByEmployer } from "../../../../app/features/employer/shortlistedSlice";
import SkeletonLoading from "./components/SkeletonLoading";
import { useTranslation } from "react-i18next";


const queryClient = new QueryClient()

function FetchData({ employerInfo }) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchShortlistedEmployerData'],
    queryFn: () => axios.post(`/api/employers/shortlisted/${employerInfo?.id}`)
      .then((res) => res.data)
  })

  if (isFetching || isPending) return <SkeletonLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getShortlistedByEmployer(data))
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/shortlisted_resume')
  const { employerInfo } = useSelector(state => state.user);

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
          {
            !employerInfo?.id
            ?
            <NoEmployerProfile />
            :
            <Tabs>
              <TabList style={{position: 'relative', bottom: '-10px'}} className="btn-box d-flex gap-2">
                <Tab className="theme-btn btn-style-four" selectedClassName="bg-white" style={{cursor: 'pointer'}}>
                    <i className="la la-briefcase me-1"></i> {t('tab_applicants')}
                </Tab>

                <Tab className="theme-btn btn-style-four" selectedClassName="bg-white" style={{cursor: 'pointer'}}>
                    <i className="la la-user me-1"></i> {t('tab_candidates')}
                </Tab>
              </TabList>

              <div className="row">
                  <div className="col-lg-12">
                    <div className="applicants-widget ls-widget">
                      <div className="widget-title">
                      </div>
                      <QueryClientProvider client={queryClient}>
                        <FetchData employerInfo={employerInfo} />
                      </QueryClientProvider>
                      <TabPanel>
                        <ApplicantContentBox />
                      </TabPanel>
                      <TabPanel>
                        <CandidateContentBox />
                      </TabPanel>
                    </div>
                    {/* <!-- applicants Widget --> */}
                  </div>
              </div>
            </Tabs>
            }
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
