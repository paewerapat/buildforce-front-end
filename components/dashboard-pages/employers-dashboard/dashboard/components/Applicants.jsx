import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusApplicantAction } from "../../../../../app/actions/applicantAction";
import { addApplicantToShortlistedEmployerAction, deleteApplicantFromShortlistedEmployerAction } from "../../../../../app/actions/employerAction";

const Applicants = () => {

  const { update: sessionUpdate } = useSession()
  const router = useRouter();
  const { recentApplicant: applicants, user } = useSelector(state => state.employerDashboard)
  const [shortlisted, setShortlisted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShortlisted( user?.employerInfo?.shortlisted?.applicants?.length > 0
      ? user?.employerInfo?.shortlisted?.applicants?.some(
        item => item?.id === data.id
      )
      : false
    )
  }, [user])

  async function addApplicantToShortlistedHandler(id) {
    const body = {
      id: user?.employerInfo.id, shortlisted: id
    }
    if(!shortlisted) dispatch(addApplicantToShortlistedEmployerAction(body, id))
    else dispatch(deleteApplicantFromShortlistedEmployerAction(body, id))
    await sessionUpdate()
  }

  async function updateStatusApplicantHandler(id, type) {
    const body = {
      id: id, status: type
    }
    dispatch(updateStatusApplicantAction({
      body, 
      employer: user?.employerInfo, 
      candidate: data.candidate, 
      job: data.job, 
      router
    }))
  }

  return (
    <div className="row">
      {applicants.map((item) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={item.id}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img src={item.candidate.avatar} alt="candidates" />
              </figure>
              <h4 className="name">
                <Link href={`/candidates/${item.candidate.id}`}>
                  {item.candidate.fullName}
                </Link>
              </h4>

              <ul className="candidate-info">
                <li className="designation">{item.job.jobTitle}</li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {
                    item.candidate.contact?.country && item.candidate.contact.city
                    ? item.candidate.contact?.country + ', ' + item.candidate.contact.city
                    : item.candidate.contact?.country
                    ? item.candidate.contact.country
                    : item.candidate.contact?.city
                    ? item.candidate.contact.city
                    : 'Unknown'
                  }
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  {item.candidate.expectedSalary} / hour
                </li>
              </ul>
              {/* End candidate-info */}

              <ul className="post-tags">
                {item.candidate.specialisms.map((val, i) => (
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
                  <Link href={`/candidates/${item.candidate.id}`}>
                  <button data-text="View Aplication">
                    <span className="la la-eye"></span>
                  </button>
                  </Link>
                </li>
                <li>
                  <button data-text={item.status === "Approved" ? "Already approved" : "Approve Aplication"}
                    className={item.status === "Approved" ? 'bg-success text-white' : ''}
                    disabled={item.status === "Approved"} 
                    onClick={() => updateStatusApplicantHandler(data.id, 'Approved')}
                  >
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Reject Aplication"
                    className={item.status === "Rejected" ? 'bg-danger text-white' : ''}
                    disabled={item.status === "Rejected" ? true : false}
                    onClick={() => updateStatusApplicantHandler(data.id, 'Rejected')}
                  >
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button
                    data-text={shortlisted ? "Remove from shortlisted" : "Add to shortlisted"}
                    className={shortlisted ? "bg-warning text-white" : ""}
                    onClick={() => addApplicantToShortlistedHandler(item.id)}
                  >
                    <span className="la la-bookmark-o"></span>
                  </button>
                </li>
              </ul>
            </div>
            {/* End admin options box */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Applicants;
