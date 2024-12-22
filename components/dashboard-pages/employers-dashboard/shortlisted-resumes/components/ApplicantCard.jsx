import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteApplicantFromShortlistedEmployerPageAction } from "../../../../../app/actions/employerAction";
import axios from "../../../../../lib/axios";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const ApplicantCard = ({ data }) => {

  const { t } = useTranslation('common')
  const { update: sessionUpdate } = useSession();
  const { employerInfo } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const router = useRouter();

  async function deleteApplicantFromShortlistedHandler(applicantId) {
    const body = {
      id: employerInfo?.id, shortlisted: applicantId
    }
    dispatch(deleteApplicantFromShortlistedEmployerPageAction(body, applicantId))
    await sessionUpdate();
  }

  async function rejectedApplicantHandler() {
    const body = {
      id: data.id, status: 'Rejected'
    }
    await axios.post('/api/applicants/update', body)
    toast.success(`Reject ${data.candidate.fullName} successful`)
    return router.replace(router.asPath)
  }

  return (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={data.id}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img src={data.candidate.avatar} alt="candidates" />
              </figure>
              <h4 className="name">
                <Link href={`/candidates-single-v1/${data.candidate.id}`}>
                  {data.candidate.fullName}
                </Link>
              </h4>

              <ul className="candidate-info">
                <li className="designation">{data.designation}</li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {
                    data.candidate.contact?.country && data.candidate.contact.city
                    ? data.candidate.contact?.country + ', ' + data.candidate.contact.city
                    : data.candidate.contact?.country
                    ? data.candidate.contact.country
                    : data.candidate.contact?.city
                    ? data.candidate.contact.city
                    : 'Unknown'
                  }
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  {(data.candidate.expectedSalary / 30 / 8).toLocaleString(0)} / hour
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
                  <button data-text={t("View Application")} type="button">
                    <span className="la la-eye"></span>
                  </button>
                  </Link>
                </li>
                <li>
                  <button 
                    data-text={data.status === "Approved" ? "Already approved" : t("Approve Application")}
                    className={data.status === "Approved" 
                      ? 'bg-success text-white'
                      : data.status === "Rejected"
                      ? 'bg-light text-muted'
                      : ''
                    }
                    disabled={data.status === "Approved" 
                      ? true 
                      : data.status === "Rejected"
                      ? true
                      : false
                    }  
                    type="button"
                  >
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button 
                    data-text={t("Reject Application")}
                    onClick={() => rejectedApplicantHandler()}
                    className={data.status === "Rejected"
                    ? "bg-danger text-white"
                    : data.status === "Approved"
                    ? "bg-light text-muted"
                    : ''
                    }
                    disabled={data.status === "Approved" 
                      ? true 
                      : data.status === "Rejected"
                      ? true
                      : false
                    }
                    type="button"
                  >
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button 
                    data-text={t("Remove from shortlisted")} type="button"
                    className="bg-warning text-white"
                    onClick={() => deleteApplicantFromShortlistedHandler(data.id)}
                  >
                    <span className="la la-bookmark"></span>
                  </button>
                </li>
              </ul>
            </div>
            {/* End admin options box */}
          </div>
        </div>
  );
};

export default ApplicantCard;
