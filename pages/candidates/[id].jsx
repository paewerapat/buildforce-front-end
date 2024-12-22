import { CircularProgress } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import parse from "html-react-parser";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import nookies from 'nookies';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCandidateToShortlistedEmployerAction } from "../../app/actions/employerAction";
import NoResumeProfile from "../../components/candidates-listing-pages/components/NoResumeProfile";
import JobSkills from "../../components/candidates-single-pages/shared-components/JobSkills";
import SkeletonLoading from "../../components/candidates-single-pages/shared-components/SkeletonLoading";
import Social from "../../components/candidates-single-pages/social/Social";
import Seo from "../../components/common/Seo";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import axios from "../../lib/axios";

export async function getServerSideProps(context) {

  const locale = nookies.get(context).NEXT_LOCALE || context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common", "candidate_id"
      ])),
      // Will be passed to the page component as props
    },
  };
}

const queryClient = new QueryClient();

function FetchData({
  setData,
  setApplicant,
  id,
  applied,
  shortlisted,
  addEmployerToShortlistedHandler,
  downloadCVHandler,
}) {

  useQuery({
    queryKey: ["fetchApplicantCandidateSingleData"],
    queryFn: () =>
      axios.get(`/api/applicants/candidate`, { id: id }).then(({ data }) => {
        setApplicant(data);
        return data;
      }),
  });
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["fetchCandidateSingleData"],
    queryFn: () =>
      axios.post(`/api/candidates/${id}`).then(({ data }) => {
        setData(data);
        return data;
      }),
  });

  const { t } = useTranslation("candidate_id");

  if (isPending || isFetching) return <SkeletonLoading t={t} />;
  if (error) return "An error has occurred: " + error.message;
  if (data)
    return (
      <section className="candidate-detail-section">
        <div className="candidate-detail-outer">
          <div className="auto-container">
            {data ? (
              <div className="row">
                <div className="content-column col-lg-8 col-md-12 col-sm-12 mb-3">
                  <div className="candidate-block-five">
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img src={data?.candidate?.avatar} alt="avatar" />
                        </figure>
                        <h4
                          className="name"
                          style={{ textTransform: "capitalize" }}
                        >
                          {data?.candidate?.fullName}
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">{data?.designation}</li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {data?.candidate?.contact?.country &&
                            data?.candidate?.contact?.city
                              ? data?.candidate?.contact?.country +
                                ", " +
                                data?.candidate?.contact.city
                              : data?.candidate?.contact?.country
                              ? data?.candidate?.contact.country
                              : t("Unknown")}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {(data?.candidate?.expectedSalary / 30 / 8).toFixed(
                              2
                            )}{" "}
                            / {t("Hour")}
                          </li>
                          <li>
                            <span className="icon flaticon-clock"></span>{" "}
                            {t("Member") + " "}
                            {data.candidate?.createdAt
                              ? moment(data.candidate?.createdAt).format("LLL")
                              : t("Unknown")}
                          </li>
                        </ul>

                        <ul className="post-tags">
                          {data?.tags?.map((val, i) => (
                            <li key={i}>{val}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/*  <!-- Candidate block Five --> */}

                  <div className="job-detail">
                    {data?.candidate?.description &&
                      parse(data?.candidate?.description)}

                    {/* <!-- Candidate Resume Start --> */}
                    {/* Education Block */}
                    <div className={`resume-outer mt-5`}>
                      <div className="upper-title">
                        <h4>{t("title_education")}</h4>
                      </div>
                      {data?.education?.map((resume, index) => (
                        <div className="resume-block" key={index}>
                          <div className="inner">
                            <span className="name">{index}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{resume.academicFields}</h3>
                                <span>{resume.college}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">
                                  {resume.educationYear}
                                </span>
                              </div>
                            </div>
                            <div className="text">
                              {parse(resume.educationDescription)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <!-- End Resume BLock --> */}
                    </div>

                    {/* Work & Experience */}
                    <div className={`resume-outer theme-blue`}>
                      <div className="upper-title">
                        <h4>{t("title_work_and_experience")}</h4>
                      </div>
                      {data?.experience?.map((resume, index) => (
                        <div className="resume-block" key={index}>
                          <div className="inner">
                            <span className="name">{index + 1}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{resume.jobPosition}</h3>
                                <span>{resume.companyName}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">
                                  {resume.experienceYear}
                                </span>
                              </div>
                            </div>
                            <div className="text">
                              {parse(resume.experienceDescription)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <!-- End Resume BLock --> */}
                    </div>

                    {/* Awards */}
                    <div className={`resume-outer theme-yellow`}>
                      <div className="upper-title">
                        <h4>{t("title_awards")}</h4>
                      </div>
                      {data?.awards?.map((resume, index) => (
                        <div className="resume-block" key={index}>
                          <div className="inner">
                            <span className="name">{index + 1}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{resume.awardTitle}</h3>
                                <span>{resume.awardProject}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">{resume.awardYear}</span>
                              </div>
                            </div>
                            <div className="text">
                              {parse(resume.awardDescription)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <!-- End Resume BLock --> */}
                    </div>
                    {/* <!-- Candidate Resume End --> */}

                    {data?.description && parse(data?.description)}
                  </div>
                  {/* End job-details */}
                </div>
                {/* End .content-column */}

                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                  <aside className="sidebar">
                    <div className="btn-box">
                      <button
                        className={`theme-btn ${
                          applied ? "btn-style-one" : "btn-style-nine"
                        }`}
                        type="button"
                        disabled={applied ? false : true}
                        onClick={() => downloadCVHandler()}
                        download
                      >
                        <i className="flaticon-down-chevron me-1"></i> Download
                        CV
                      </button>
                      <button
                        className={
                          shortlisted
                            ? "bookmark-btn bg-warning text-white"
                            : "bookmark-btn"
                        }
                        type="button"
                        onClick={addEmployerToShortlistedHandler}
                      >
                        {alert.loading ? (
                          <CircularProgress />
                        ) : (
                          <i className="flaticon-bookmark"></i>
                        )}
                      </button>
                    </div>

                    <div className="sidebar-widget">
                      <div className="widget-content">
                        <ul className="job-overview">
                          <li>
                            <i className="icon icon-calendar"></i>
                            <h5>{t("sidebar_widget_experience")}:</h5>
                            <span>
                              {(data.candidate?.experience === 0
                                ? t("New graduates")
                                : data.candidate?.experience === 1
                                ? "1 " + t("Year")
                                : data.candidate?.experience + " Years") ||
                                t("Unknown")}
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-expiry"></i>
                            <h5>{t("sidebar_widget_age")}:</h5>
                            <span>
                              {data.candidate?.age || t("Unknown")} {t("Years")}
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-salary"></i>
                            <h5>{t("sidebar_widget_salary")}:</h5>
                            <span>
                              {data.candidate?.expectedSalary || t("Unknown")}
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-language"></i>
                            <h5>{t("sidebar_widget_language")}:</h5>
                            <span>
                              {data.candidate?.languages
                                .reduce((item, index) => {
                                  return item.concat(index).concat(", ");
                                }, [])
                                .slice(0, -1)}
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-degree"></i>
                            <h5>{t("sidebar_widget_education")}:</h5>
                            <span>{data.candidate?.qualification}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End .sidebar-widget conadidate overview */}

                    <div className="sidebar-widget social-media-widget">
                      <h4 className="widget-title">
                        {t("sidebar_widget_social")}
                      </h4>
                      <div className="widget-content">
                        <div className="social-links">
                          {data.candidate?.social ? (
                            Object.values(data.candidate?.social).some(
                              (object) => object !== null && object !== ""
                            ) ? (
                              <Social data={data.social} />
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                    </div>
                    {/* End .sidebar-widget social-media-widget */}

                    <div className="sidebar-widget">
                      <h4 className="widget-title">
                        {t("sidebar_widget_skills")}
                      </h4>
                      <div className="widget-content">
                        <ul className="job-skills">
                          <JobSkills data={data.specialisms} />
                        </ul>
                      </div>
                    </div>
                    {/* End .sidebar-widget skill widget */}

                    {/* <div className="sidebar-widget contact-widget">
                  <h4 className="widget-title">Contact Us</h4>
                  <div className="widget-content">
                    <div className="default-form">
                      <Contact />
                    </div>
                  </div>
                </div> */}
                    {/* End .sidebar-widget contact-widget */}
                  </aside>
                  {/* End .sidebar */}
                </div>
                {/* End .sidebar-column */}
              </div>
            ) : (
              <NoResumeProfile t={t} />
            )}
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
    );
}

const CandidateSingleDynamicV2 = () => {

  const router = useRouter();
  const { update: sessionUpdate, data: session } = useSession();
  const { user } = useSelector((state) => state);
  const { id } = router.query;
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [applicant, setApplicant] = useState({ applicants: [] });

  const [shortlisted, setShortlisted] = useState(
    session?.user?.employerInfo?.shortlisted?.candidates.some(
      (item) => item.id === id
    )
  );

  const applied = applicant.applicants
    ? applicant.applicants?.some(
        (item) => item?.employer?.id === user?.employerInfo?.id
      )
    : false;

  function addEmployerToShortlistedHandler() {
    const body = {
      id: user?.employerInfo?.id,
      shortlisted: id,
    };
    const updateType = shortlisted ? "delete" : "add";
    dispatch(
      addCandidateToShortlistedEmployerAction({
        body,
        updateType,
        router,
        sessionUpdate,
      })
    );
  }

  useEffect(() => {
    setShortlisted(
      session?.user?.employerInfo?.shortlisted?.candidates.length > 0
        ? session?.user?.employerInfo?.shortlisted?.candidates.some(
            (item) => item.id === id
          )
        : false
    );
  }, [session]);

  function downloadCVHandler() {
    window.open(data.cv.url, "_self");
  }

  if(data === null) return router.back();

  return (
    <>
      <Seo pageTitle={data?.candidate?.fullName} />

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
        <FetchData
          setApplicant={setApplicant}
          setData={setData}
          id={id}
          shortlisted={shortlisted}
          applied={applied}
          addEmployerToShortlistedHandler={addEmployerToShortlistedHandler}
          downloadCVHandler={downloadCVHandler}
        />
      </QueryClientProvider>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV2), {
  ssr: false,
});
