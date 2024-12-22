import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addApplicantToShortlistedEmployerAction, deleteApplicantFromShortlistedEmployerAction, } from "../../../../../app/actions/employerAction";
import { updateStatusApplicantAction } from "../../../../../app/actions/applicantAction";
import { useTranslation } from "react-i18next";

const Applicants = ({ data }) => {

  const { t } = useTranslation('common')
  const { update: sessionUpdate } = useSession();
  const { employerInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [shortlisted, setShortlisted] = useState(false);
  const router = useRouter();

  async function addApplicantToShortlistedHandler() {
    const body = {
      id: employerInfo.id, shortlisted: data.id
    }
    if(!shortlisted) dispatch(addApplicantToShortlistedEmployerAction(body, data.id))
    else dispatch(deleteApplicantFromShortlistedEmployerAction(body, data.id))
    await sessionUpdate()
  }

  async function updateStatusApplicantHandler(id, type) {
    const body = {
      id: id, status: type
    }
    dispatch(updateStatusApplicantAction({
      body, 
      employer: employerInfo, 
      candidate: data.candidate, 
      job: data.job, 
      router
    }))
  }

  useEffect(() => {
    setShortlisted(employerInfo?.shortlisted?.applicants?.length > 0
      ? employerInfo?.shortlisted?.applicants?.some(
        item => item?.id === data.id
      ) : false
    )
  }, [employerInfo, setShortlisted])

  return (
      <div
        className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
      >
        <div className="inner-box">
          <div className="content">
            <figure className="image">
              <img src={data.candidate?.avatar} alt="candidates" />
            </figure>
            <h4 className="name">
              <Link href={`/candidates/${data.candidate.id}`}>
                {data.candidate.fullName}
              </Link>
            </h4>

            <ul className="candidate-info">
              <li className="designation">
                {data.candidate.jobPosition}
              </li>
              <li>
                <span className="icon flaticon-map-locator"></span>{" "}
                {
                  data.candidate.contact?.country && data.candidate.contact.city
                  ? data.candidate.contact?.country + ', ' + data.candidate.contact.city
                  : data.candidate.contact?.country
                  ? data.candidate.contact.country
                  : data.candidate.contact?.city
                  ? data.candidate.contact.city
                  : t('unknown')
                }
              </li>
              <li>
                <span className="icon flaticon-money"></span> $
                {(data.candidate.expectedSalary / 30 / 8).toLocaleString(0)} / {t('hour')}
              </li>
            </ul>
            {/* End candidate-info */}

            <ul className="post-tags">
              {data.candidate.specialisms.map((val, i) => (
                <li key={i}>
                  <a href="#">{val}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* End content */}

          <div className="option-box">
            <ul className="option-list">
              <li>
                <Link href={`/candidates/${data.candidate.id}`}>
                <button data-text={t("View Application")}>
                  <span className="la la-eye"></span>
                </button>
                </Link>
              </li>
              <li>
                <button data-text={data.status === "Approved" ? t("Already approved") : t("Approve Application")}
                  className={data.status === "Approved" ? 'bg-success text-white' : ''}
                  disabled={data.status === "Approved" ? true : false} 
                  onClick={() => updateStatusApplicantHandler(data.id, 'Approved')}
                >
                  <span className="la la-check"></span>
                </button>
              </li>
              <li>
                <button data-text={t("Reject Application")}
                  className={data.status === "Rejected" ? 'bg-danger text-white' : ''}
                  disabled={data.status === "Rejected" ? true : false}
                  onClick={() => updateStatusApplicantHandler(data.id, 'Rejected')}
                >
                  <span className="la la-times-circle"></span>
                </button>
              </li>
              <li>
                <button
                  data-text={shortlisted ? t("Remove from shortlisted") : t("Add to shortlisted")}
                  className={shortlisted ? "bg-warning text-white" : ""}
                  onClick={() => addApplicantToShortlistedHandler()}
                >
                  <span className="la la-bookmark-o"></span>
                </button>
              </li>
            </ul>
          </div>
          {/* End admin options box */}
        </div>
      </div>
  );
};

export default Applicants;
