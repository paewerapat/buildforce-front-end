import { CircularProgress } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import parse from "html-react-parser";
import moment from "moment";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies from 'nookies';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoadingState } from "../../app/features/alertSlice";
import Seo from "../../components/common/Seo";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import JobOverView2 from "../../components/job-single-pages/job-overview/JobOverView2";
import RelatedJobs2 from "../../components/job-single-pages/related-jobs/RelatedJobs2";
import ApplyJobModalContent from "../../components/job-single-pages/shared-components/ApplyJobModalContent";
import CompnayInfo from "../../components/job-single-pages/shared-components/CompanyInfo";
import SkeletonApplicantLoading from "../../components/job-single-pages/shared-components/SkeletonApplicantLoading";
import SkeletonCvLoading from "../../components/job-single-pages/shared-components/SkeletonCvLoading";
import SkeletonJobLoading from "../../components/job-single-pages/shared-components/SkeletonJobLoading";
import SocialTwo from "../../components/job-single-pages/social/SocialTwo";
import axios from "../../lib/axios";

export async function getServerSideProps(context) {

  const locale = nookies.get(context).NEXT_LOCALE || context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'job_id'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const queryClient = new QueryClient();

function FetchJobData({ setJob, id, job }) {

  const { t } = useTranslation('job_id')
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["fetchJobSingleData"],
    queryFn: () =>
      axios.get(`/api/jobs/${id}`).then(({ data }) => {
        setJob(data);
        return data;
      }),
  });

  if (isPending || isFetching) return <SkeletonJobLoading t={t} />;
  if (error) return "An error has occurred: " + error.message;
  if (data)
    return (
      <div className="content-column col-lg-8 col-md-12 col-sm-12">
        <div className="job-block-outer">
          <div className="job-block-seven style-two">
            <div className="inner-box">
              <div className="content">
                <h4>{job?.jobTitle}</h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {job?.employer?.companyName}
                  </li>
                  {/* compnay info */}
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {job?.contact?.country && job?.contact?.city
                      ? job?.contact?.country + ", " + job?.contact.city
                      : job?.contact?.country
                      ? job?.contact.country
                      : job?.contact?.city
                      ? job?.contact.city
                      : "Unknown"}
                  </li>
                  {/* location info */}
                  <li>
                    <span className="icon flaticon-clock-3"></span>{" "}
                    {moment(job?.expiredDate).fromNow()}
                  </li>
                  {/* time info */}
                  <li>
                    <span className="icon flaticon-money"></span> {job?.salary}
                  </li>
                  {/* salary info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  <li className="time">{job?.employmentType}</li>
                  <li className="required">{job?.workplaceModes}</li>
                  <li className="privacy">
                    {job?.experience === 0
                      ? t('new_graduates')
                      : job?.experience === 1
                      ? "1 " + t('year')
                      : job?.experience + " " + t('years')}
                  </li>
                </ul>
                {/* End .job-other-info */}
              </div>
              {/* End .content */}
            </div>
          </div>
          {/* <!-- Job Block --> */}
        </div>
        {/* <!-- job block outer --> */}

        <div className="job-overview-two">
          <h4>{t('job_overview_description')}</h4>
          <JobOverView2 data={job} />
        </div>
        {/* <!-- job-overview-two --> */}

        <div className="job-detail">
          {job?.description && parse(job?.description)}
        </div>
        {/* End job-details */}

        <div className="other-options">
          <div className="social-share">
            <h5>{t('social_share')}</h5>
            <SocialTwo />
          </div>
        </div>
      </div>
    );
}

function FetchApplicantData({
  setApplicant,
  id,
  candidateInfo,
  applicant,
  job,
  user,
  t
}) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["fetchApplicantJobSingleData"],
    queryFn: () =>
      axios.post(`/api/applicants/candidate/job`, {
          job: id,
          candidate: candidateInfo?.id,
        })
        .then(({ data }) => {
          setApplicant(data);
          return data;
        }),
  });

  if (isPending || isFetching) return <SkeletonApplicantLoading t={t} />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {(job?.employer?.id !== user?.employerInfo?.id && user?.employerInfo?.id) 
      ? (
        <Link
          className="theme-btn btn-style-one"
          href={`/employers-dashboard/post-jobs?edit=true&id=${id}`}
        >
          Edit Job
        </Link>
      ) : (
        <button
          type="button"
          className={`theme-btn ${
            applicant ? "btn-style-nine" : "btn-style-one"
          }`}
          data-bs-toggle="modal"
          data-bs-target="#applyJobModal"
          disabled={applicant ? true : false}
        >
          {applicant ? (
            <span>&#10003; {t('Applied This Job')}</span>
          ) : (
            t('Apply For Job')
          )}
        </button>
      )}
    </>
  );
}

function FetchCvData({ candidateInfo, setCV, job, cv, t }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["fetchCvJobSingleData"],
    queryFn: () =>
      axios
        .post("/api/candidates/profile/cv", {
          id: candidateInfo?.id,
        })
        .then(({ data }) => {
          setCV(data);
          return data;
        }),
  });

  if (isPending || isFetching) return <SkeletonCvLoading t={t} />;
  if (error) return "An error has occurred: " + error.message;
  if (data)
    return (
      <ApplyJobModalContent
        data={cv}
        employer={job?.employer?.id}
        job={job}
        candidate={candidateInfo}
      />
    );
}

const JobSingleDynamicV3 = () => {

  const { t } = useTranslation('job_id')
  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();
  const { alert, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cv, setCV] = useState("");
  const [applicant, setApplicant] = useState("");
  const [job, setJob] = useState("");

  const { id } = router.query;
  const [shortlisted, setShortlisted] = useState(
    session?.user?.candidateInfo?.shortlisted?.jobs.some(
      (item) => item.id === id
    )
  );

  async function addShortlistedJobHandler() {
    if (!session?.user) return toast.warn("Please signin first");
    else if (!session?.user?.candidateInfo)
      return toast.warn("Please create Candidate profile first");
    const body = { shortlisted: job.id, id: session.user.candidateInfo.id };
    try {
      dispatch(setLoadingState(true));
      const updateType = shortlisted ? "delete" : "add";
      await axios.post("/api/candidates/shortlisted/jobs/update", body, {
        headers: {
          updateType: updateType,
        },
      });
      await sessionUpdate();
      dispatch(setLoadingState(false));
      return router.replace(router.asPath);
    } catch (err) {
      dispatch(setLoadingState(false));
      return toast.error(err.response.data.msg);
    }
  }

  useEffect(() => {
    setShortlisted(
      session?.user?.candidateInfo?.shortlisted?.jobs.length > 0
        ? session?.user?.candidateInfo?.shortlisted?.jobs.some(
            (item) => item.id === id
          )
        : false
    );
  }, [session]);

  // if(job === null) return router.back();

  return (
    <>
      <Seo pageTitle={job?.jobTitle} />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">

              <QueryClientProvider client={queryClient}>
                <FetchJobData setJob={setJob} id={id} job={job} />
              </QueryClientProvider>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="btn-box">
                    <QueryClientProvider client={queryClient}>
                      <FetchApplicantData
                        setApplicant={setApplicant}
                        id={id}
                        candidateInfo={user?.candidateInfo}
                        applicant={applicant}
                        job={job}
                        user={user}
                        t={t}
                      />
                    </QueryClientProvider>
                    <button
                      className={
                        shortlisted
                          ? "bookmark-btn bg-warning text-white"
                          : "bookmark-btn"
                      }
                      type="button"
                      onClick={() => addShortlistedJobHandler()}
                    >
                      {alert.loading ? (
                        <CircularProgress />
                      ) : (
                        <i className="flaticon-bookmark"></i>
                      )}
                    </button>
                  </div>
                  {/* End apply for job btn */}

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">
                            {alert.loading ? (
                              <CircularProgress />
                            ) : (
                              t('apply_for_job')
                            )}
                          </h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        {/* End modal-header */}

                        <QueryClientProvider client={queryClient}>
                          <FetchCvData
                            candidateInfo={user?.candidateInfo}
                            setCV={setCV}
                            job={job}
                            cv={cv}
                            t={t}
                          />
                        </QueryClientProvider>

                        {/* End PrivateMessageBox */}
                      </div>
                      {/* End .send-private-message-wrapper */}
                    </div>
                  </div>
                  {/* End .modal */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          {
                            job?.employer?.logo 
                            && <img src={job?.employer?.logo} alt="resource" />
                            || <Skeleton height={60} width={60} />
                          }
                        </div>
                        <h5 className="company-name">
                          {job?.employer?.companyName || <Skeleton width={120} />}
                        </h5>
                        <Link
                          href={`/employers/${job?.employer?.id}`}
                          className="profile-link"
                        >
                          {t('sidebar_widget_profile_link')}
                        </Link>
                      </div>
                      {/* End company title */}

                      <CompnayInfo t={t} company={job?.employer} />

                      <div className="btn-box">
                        {job?.employer?.website ? (
                          <a
                            className="theme-btn btn-style-three"
                            href={
                              job?.employer.website.indexOf("://") === -1
                                ? "https://" + job?.employer.website
                                : job?.employer.website
                            }
                            target="_blank"
                            rel="noopener noreferrer"
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
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}

                  {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}
                  {/* End contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
            {/* End .row  */}

            <div className="related-jobs">
              <div className="title-box">
                <h3>{t('related_jobs')}</h3>
              </div>
              {/* End title box */}

              <div className="row">
                <RelatedJobs2 jobPosition={job?.jobPosition} />
              </div>
              {/* End .row */}
            </div>
            {/* <!-- Related Jobs --> */}
          </div>
          {/* End auto-container */}
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV3), {
  ssr: false,
});
