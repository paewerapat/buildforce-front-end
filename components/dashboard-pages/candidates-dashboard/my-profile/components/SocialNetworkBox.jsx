import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

const SocialNetworkBox = ({ data, t }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialState = data?.social
  ? data.social
  : {
    facebook: '', twitter: '', linkedin: ''
  }
  const [candidateData, setCandidateData] = useState(initialState)
  const { facebook, twitter, linkedin } = candidateData

  useEffect(() => {
    setCandidateData(initialState)
  }, [data])

  function onChangeHanlder(event) {
    const { value, name } = event.target
    setCandidateData({...candidateData, [name]:value })
  }

  async function submitFormCandidateHandler(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const body = { social: {...candidateData}, id: data?.id }
      const updateType = "social"
      const { data: response } = await axios.post("/api/candidates/profile/update", body, {
        headers: {
          updateType: updateType
        }
      })
      setLoading(false);
      toast.success(
        <>
        {response.msg}
        <br/>
        <Link className="text-light fw-bold" href={`/candidates/${response.updateSocialCandidate.id}`}>
            Click here to Candidate profile
        </Link>
        </>
      );
      setTimeout(() => {
          router.reload();
      }, [4000])
    } catch (err) {
      setLoading(false)
      console.log("[submitFormEmployerData-err] - ", err)
      toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
    }
  }

  return (
    <form className="default-form" onSubmit={submitFormCandidateHandler}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            value={facebook}
            onChange={(e) => onChangeHanlder(e)}
            placeholder="www.facebook.com/buidlforce"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input type="text" 
            name="twitter"
            value={twitter} 
            placeholder="www.twitter.com/buidlforce" 
            onChange={(e) => onChangeHanlder(e)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input type="text" 
            name="linkedin" 
            value={linkedin}
            onChange={(e) => onChangeHanlder(e)}
            placeholder="www.linkedin.com/company/buidlforce" 
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-md-12">
          <button type="submit" className="theme-btn btn-style-one" disabled={loading} >
            { 
              loading 
              ? <CircularProgress />
              : t('button_save')
            }
          </button>
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
