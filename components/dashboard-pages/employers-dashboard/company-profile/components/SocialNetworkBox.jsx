import { CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SocialNetworkBox = ({ data }) => {

  const { t } = useTranslation('dashboard/employer/company_profile')
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialState = data.social
  ? data.social
  : {
    facebook: '', twitter: '', linkedin: ''
  }
  const [employerData, setEmployerData] = useState(initialState);
  const { facebook, twitter, linkedin } = employerData;

  function onChangeHanlder(event) {
      const { value, name } = event.target
      setEmployerData({...employerData, [name]:value })
  }

  async function submitFormEmployerData(event) {
    event.preventDefault();
    try {
      const body = {social: {...employerData}, id: data.id};
      const updateType = 'social'
      const { data: response} = await axios.post("/api/employers/profile/update", body, {
          headers: { updateType: updateType }
      })
      setLoading(false);
      toast.success(
        <>
        {response.msg}
        <br/>
        <Link className="text-light fw-bold" href={`/employers/${response.updateSocialEmployer.id}`}>
            Click here to Employer profile
        </Link>
        </>
      );
      router.replace(router.asPath)
    } catch (err) {
      setLoading(false)
      console.log("[submitFormEmployerData-err] - ", err)
      toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
    }
  }

  useEffect(() => {
    setEmployerData(initialState)
  }, [data])

  return (
    <form className="default-form" onSubmit={submitFormEmployerData}>
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
            placeholder="www.twitter.com/buidlforce"
            onChange={(e) => onChangeHanlder(e)}
            value={twitter}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input type="text" 
            name="linkedin" 
            placeholder="www.linkedin.com/company/buidlforce"
            onChange={(e) => onChangeHanlder(e)}
            value={linkedin}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
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
