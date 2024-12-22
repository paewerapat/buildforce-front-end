import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getEmployers } from "../../../app/features/employer/employerSlice";
import axios from "../../../lib/axios";
import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterSidebar from "./FilterSidebar";
import FilterTopBox from "./FilterTopBox";
import SkeletonLoading from "./SkeletonLoading";


const queryClient = new QueryClient()

function FetchData() {

  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.post(`/api/employers`).then((res) => res.data)
  })

  if (isPending || isFetching) return <SkeletonLoading />
  if (error) return 'An error has occurred: ' + error.message
  if (data) dispatch(getEmployers(data))

  return (
    <FilterTopBox />
  )
}

const Index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>
            {/* End filter column for tablet and mobile devices */}

            <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12">
              <FilterSidebar />
            </div>
            {/* <!-- End Filters Column for destop and laptop --> */}

            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="ls-outer">
                <QueryClientProvider client={queryClient}>
                  <FetchData />
                </QueryClientProvider>
                {/* <!-- ls Switcher --> */}
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
