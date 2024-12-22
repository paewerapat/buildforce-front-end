import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getNotify } from "../../../../app/features/notifySlice";
import axios from "../../../../lib/axios";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import DashboardHeader from "../../../header/DashboardHeader";
import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import AlertDataTable from "./components/AlertDataTable";
import ListingShowing from './components/ListingShowing';
import SkeletonLoading from "./components/SkeletonLoading";

const queryClient = new QueryClient()

function FetchData({ employerInfo }) {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['fetchNotificationEmployerData'],
    queryFn: () => axios.post(`/api/notify/employer`, { id: employerInfo?.id })
      .then((res) => res.data)
  })

  if (isFetching || isPending) return <SkeletonLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getNotify(data))

  return (
    <AlertDataTable />
  )
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/notifications')
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
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>
                      <span className="la la-bell"></span> {t('title_h4')}
                    </h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    <QueryClientProvider client={queryClient}>
                      <FetchData employerInfo={employerInfo} />
                    </QueryClientProvider>
                  </div>
                  {/* End widget-content */}
                </div>

                <ListingShowing />
              </div>
              {/* <!-- Ls widget --> */}
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
