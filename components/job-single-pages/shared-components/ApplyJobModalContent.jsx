import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { applyJobAction } from "../../../app/actions/applicantAction";
import { useRouter } from "next/router";

const ApplyJobModalContent = ({ data, candidate, employer, job }) => {
  
  const [cv, setCv] = useState(data?.cv)
  const [policy, setPolicy] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();

  async function submitApplyJobHandler(event) {
    event.preventDefault();
    if(!policy) return toast.warning("Please indicate that you accept the Terms and Conditions and Privacy Policy.")
    const body = {
      cv, candidate: candidate.id, employer, job: job.id, status: 'Active'
    }
    dispatch(applyJobAction({candidate, job, employer, router, body}))
  }

  if(!candidate) return <AlertDataMessage />

  return (
    <form className="default-form job-apply-form" onSubmit={submitApplyJobHandler}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-cv-outer">
            <div className="uploadButton">
              <select className="chosen-single form-select" value={cv} name="cv" onChange={(e) => setCv(JSON.parse(e.target.value))}>
                <option value={JSON.stringify(data?.cv)}>{data?.cv?.name}</option>
              </select>
            </div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <Link href={"/candidates-dashboard/cv-manager"}><small>No CV file? or CV Mananger</small></Link>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input type="checkbox" name="remember-me" id="rememberMe" onChange={(e) => setPolicy(e.target.checked)} />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link href="/terms">
                  Terms and Conditions and Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Apply Job
          </button>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

const AlertDataMessage = () => {

  const { user } = useSelector(state => state)

  return (
    <>
    <hr className="position-relative my-3 bg-secondary"/>
    <div className="row">
      {
        user?.type === "candidate"
        ? 
        <div
          className="theme-btn btn-style-one w-100"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <Link className="text-white" href="/candidates-dashboard/my-profile">
            Candidate Profile
          </Link>
        </div>
        :
        user?.type === "employer"
        ?
        <div className="col-12">
          <span className="theme-btn btn-style-seven call-modal w-100">
            <i className="fa fa-info-circle text-white me-1"></i> You are not a Candidate.
          </span>
        </div>
        :
        <div className="col-12">
          <div
            className="theme-btn btn-style-one call-modal w-100"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <Link className="text-white" href="/login">
              <i className="fa fa-info-circle text-white me-1"></i> Please log in first
            </Link>
          </div>
        </div>
      }
    </div>
    </>
  )
}

export default ApplyJobModalContent;
