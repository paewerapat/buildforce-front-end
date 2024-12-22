import Header from "./Header";
import Footer from "./Footer";
import Hero4 from "../hero/hero-4";
import JobFilterTab from "../job-featured/JobFilterTab";
import Block2 from "../block/Block2";
import TopCompany from "../top-company/TopCompany";
import JobCategorie1 from "../job-categories/JobCategorie1";
import LoginPopup from "../common/form/login/LoginPopup";
import MobileMenu from "../header/MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "../../lib/axios";
import SkeletonAllJobLoading from "./SkeletonAllJobLoading";
import SkeletonTopJobLoading from "./SkeletonTopJobLoading";
import SkeletonTopEmployerLoading from "./SkeletonTopEmployerLoading";
import {
  getAllJobHomeData,
  getEmployerHomeData,
  getJobHomeData,
} from "../../app/features/homeSlice";
import { useTranslation } from "next-i18next";

const queryClient = new QueryClient();

function AllJobLength({ t }) {

    const { postedJob } = useSelector(state => state.homePage)

    return (
        <div className="text">
            {t("job_categories_text")} {postedJob} {t("open jobs")}
        </div>
    );
}

function FetchDataAllJob() {
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["FetchDataAllJob"],
    queryFn: () => axios.post(`/api/jobs/all`).then((res) => res.data),
  });

  if (isPending || isFetching) return <SkeletonAllJobLoading />;
  if (error) return "An error has occurred: " + error.message;
  if (data) dispatch(getAllJobHomeData(data));

  return <JobCategorie1 />;
}

function FetchDataTopJob() {
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["FetchDataTopJob"],
    queryFn: () =>
      axios.post(`/api/jobs`, { limit: 6 }).then((res) => res.data),
  });

  if (isPending || isFetching) return <SkeletonTopJobLoading />;
  if (error) return "An error has occurred: " + error.message;
  if (data) dispatch(getJobHomeData(data));

  return <JobFilterTab />;
}

function FetchDataTopEmployer() {
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["FetchDataTopEmployer"],
    queryFn: () =>
      axios.post(`/api/employers`, { limit: 12 }).then((res) => res.data),
  });

  if (isPending || isFetching) return <SkeletonTopEmployerLoading />;
  if (error) return "An error has occurred: " + error.message;
  if (data) dispatch(getEmployerHomeData(data));

  return <TopCompany />;
}

const Index = () => {
  const { t } = useTranslation("home");

  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero4 />
      {/* <!-- End Banner Section--> */}

      <section className="job-section alternate">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t("job_section_h2")}</h2>
            <div className="text">{t("job_section_text")}</div>
          </div>
          {/* End sec-title */}

          <div className="default-tabs tabs-box">
            <QueryClientProvider client={queryClient}>
              <FetchDataTopJob />
            </QueryClientProvider>
          </div>
          {/* End .default-tabs */}
        </div>
      </section>
      {/* <!-- End Job Section --> */}

      <section className="process-section pt-0">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t("process_section_h2")}</h2>
            <div className="text">{t("process_section_text")}</div>
          </div>

          <div className="row" data-aos="fade-up">
            <Block2 />
          </div>
        </div>
      </section>
      {/* <!-- End Process Section --> */}

      <section className="top-companies style-two">
        <div className="auto-container">
          <div className="sec-title">
            <h2>{t("top_companies_h2")}</h2>
            <div className="text">{t("top_companies_text")}</div>
          </div>

          <div className="carousel-outer" data-aos="fade-up">
            <div className="companies-carousel">
              <QueryClientProvider client={queryClient}>
                <FetchDataTopEmployer />
              </QueryClientProvider>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Top Companies --> */}

      <section className="job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t("job_categories_h2")}</h2>
            <AllJobLength t={t} />
          </div>


          <div
            className="row "
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* <!-- Category Block --> */}
            <QueryClientProvider client={queryClient}>
              <FetchDataAllJob />
            </QueryClientProvider>
          </div>
        </div>
      </section>
      {/* End Job Categorie Section */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
