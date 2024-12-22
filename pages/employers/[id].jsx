import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies from 'nookies';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addEmployerToShortlistedAction } from "../../app/actions/candidateAction";
import Seo from "../../components/common/Seo";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import RelatedJobs from "../../components/employer-single-pages/related-jobs/RelatedJobs";
import JobDetailsDescriptions from "../../components/employer-single-pages/shared-components/JobDetailsDescriptions";
import SkeletonLoading from "../../components/employer-single-pages/shared-components/SkeletonLoading";
import Social from "../../components/employer-single-pages/social/Social";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import axios from "../../lib/axios";

export async function getServerSideProps(context) {

  const locale = nookies.get(context).NEXT_LOCALE || context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'employer_id'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const queryClient = new QueryClient();

function FetchData({ setEmployer, id, employer, shortlisted, user, addEmployerToShortlistedHandler }) {
  
  const { t } = useTranslation('employer_id')
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["fetchEmployerSingleData"],
    queryFn: () =>
      axios.get(`/api/employers/${id}`).then(({ data }) => {
        setEmployer(data);
        return data;
      }),
  });

  if (isPending || isFetching) return <SkeletonLoading t={t} />;
  if (error) return "An error has occurred: " + error.message;
  if (data)
    return (
      <section className="job-detail-section">
        {/* <!-- Upper Box --> */}
        <div className="upper-box" style={{backgroundImage: `url(${employer?.cover})` || `url(/images/icons/bg-4.png)`}}>
          <div className="auto-container cover_img">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={employer?.logo} alt="logo" />
                  </span>
                  <h4>{employer?.companyName}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {employer.contact?.country && employer.contact.city
                        ? employer.contact?.country +
                          ", " +
                          employer.contact.city
                        : employer.contact?.country
                        ? employer.contact.country
                        : "-"}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {employer?.industry}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-telephone-1"></span>
                      {employer?.phone || "-"}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {employer?.contactEmail || "-"}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    <li className="time">
                      {t('job_other_info')} – {moment(employer.founded).format("LL")}
                    </li>
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                <div className="btn-box">
                  {/* <button
                    className="theme-btn btn-style-four"
                    data-bs-toggle="modal"
                    data-bs-target="#privateMessage"
                    disabled
                  >
                    Private Message
                  </button> */}
                  <button
                    className={
                      shortlisted
                        ? "bookmark-btn bg-warning text-white"
                        : "bookmark-btn"
                    }
                    type="button"
                    onClick={() => addEmployerToShortlistedHandler()}
                  >
                    <i className="flaticon-bookmark"></i>
                  </button>
                  {id === user?.employerInfo?.id && (
                    <Link
                      className="bookmark-btn"
                      href={`/employers-dashboard/company-profile`}
                    >
                      <i className="fa fa-pencil-alt"></i>
                    </Link>
                  )}
                </div>
                {/* End btn-box */}

                {/* <!-- Modal --> */}
                {/* <div
                  className="modal fade"
                  id="privateMessage"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">
                          Send message to {employer.name}
                        </h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <PrivateMessageBox />
                    </div>
                  </div>
                </div> */}
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        {/* <!-- job-detail-outer--> */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/*  job-detail */}
                <JobDetailsDescriptions about={employer.about} t={t} />
                {/* End job-detail */}

                {/* <!-- Related Jobs --> */}
                <div className="related-jobs">
                  <RelatedJobs id={employer.id} />
                  {/* End RelatedJobs */}
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      {/*  compnay-info */}
                      <ul className="company-info mt-0">
                        <li>
                          {t('sidebar_widget_industry')}:{" "}
                          <span>{employer?.industry || "-"}</span>
                        </li>
                        <li>
                          {t('sidebar_widget_company_size')}:{" "}
                          <span>{employer?.companySize || "-"}</span>
                        </li>
                        <li>
                          {t('sidebar_widget_phone')}: <span>{employer?.phone || "-"}</span>
                        </li>
                        <li>
                          {t('sidebar_widget_email')}: <span>{employer?.contactEmail || "-"}</span>
                        </li>
                        <li>
                          {t('sidebar_widget_location')}:{" "}
                          <span className="d-flex gap-1">
                            {employer.contact?.country && employer.contact.city
                              ? employer.contact?.country +
                                ", " +
                                employer.contact.city
                              : employer.contact?.country
                              ? employer.contact.country
                              : "-"}
                          </span>
                        </li>
                        <li>
                          {t('sidebar_widget_social')}:
                          <span>
                            {employer?.social ? (
                              Object.values(employer?.social).some(
                                (object) => object !== null && object !== ""
                              ) ? (
                                <Social data={employer.social} />
                              ) : (
                                "-"
                              )
                            ) : (
                              "-"
                            )}
                          </span>
                        </li>
                      </ul>
                      {/* End compnay-info */}

                      <div className="btn-box">
                        {employer?.website ? (
                          <a
                            href={
                              employer.website.indexOf("://") === -1
                                ? "https://" + employer.website
                                : employer.website
                            }
                            className="theme-btn btn-style-three"
                          >
                            {t('sidebar_widget_website')}
                          </a>
                        ) : (
                          <button
                            className="theme-btn btn-style-nine text-white"
                            type="button"
                            disabled
                          >
                            {t('sidebar_widget_website')}
                          </button>
                        )}
                      </div>
                      {/* btn-box */}
                    </div>
                  </div>
                  {/* End company-widget */}

                  {/* End sidebar-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
    );
}

const EmployersSingleV1 = () => {

  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state)

  const [employer, setEmployer] = useState({});

  const [shortlisted, setShortlisted] = useState(
    session?.user?.candidateInfo?.shortlisted?.employers.some(
      (item) => item.id === id
    )
  );

  function addEmployerToShortlistedHandler() {
    const body = {
      id: session?.user?.candidateInfo?.id,
      shortlisted: id,
    };
    const updateType = shortlisted ? "delete" : "add";
    dispatch(
      addEmployerToShortlistedAction({
        body,
        updateType,
        router,
        sessionUpdate,
      })
    );
  }

  useEffect(() => {
    setShortlisted(
      session?.user?.candidateInfo?.shortlisted?.employers.length > 0
        ? session?.user?.candidateInfo?.shortlisted?.employers.some(
            (item) => item.id === id
          )
        : false
    );
  }, [session, setShortlisted]);

  if(employer === null) return router.back();

  return (
    <>
      <Seo pageTitle={employer?.companyName} />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <QueryClientProvider client={queryClient}>
        <FetchData addEmployerToShortlistedHandler={addEmployerToShortlistedHandler} setEmployer={setEmployer} employer={employer} user={user} id={id} shortlisted={shortlisted} />
      </QueryClientProvider>

      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});
