import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../../notification/Loading";
import { checkPasswordStrength } from "../../../../utils/strengthPassword";
import { useTranslation } from "react-i18next";

const FormContent = () => {

  const { t } = useTranslation('reset_password')
  const router = useRouter();
  const { token } = router.query
  const initialState = {
    password: "", cfPassword: "", token
  }

  const [formData, setFormData] = useState(initialState);
  const { password, cfPassword } = formData;

  const initialErrorState = {
    email: ""
  }
  const [errors, setErrors] = useState(initialErrorState);
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");

  function onChangeValueHandler(event) {
    const { value, name } = event.target;
    setFormData({...formData, [name]:value})
  }

  async function submitFormLogin(event) {
    event.preventDefault();
    if(password !== cfPassword) {
      setFormData({...formData, password: "", cfPassword: ""})
      return setErrors({...errors, msg: 'Password and confirm password mismatch'})
    }
    const checkPassword = checkPasswordStrength(password)
    if(checkPassword.strength <= 2) {
      setLoading(false)
      return setErrors({...errors, msg: checkPassword.tip})
    }
    setLoading(true)
    axios.post("/api/user/reset-password", formData).then(res => {
      const { data } = res;
      setResMsg(data.msg)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      console.log("[login-error] - ", error)
      setErrors(error.response.data)
    })
  }

  return (
    <div className="form-inner">
      {
        loading && <Loading />
      }
      <h3>{t('title_h3')}</h3>

      {/* Alert Success from register page */}
      {resMsg && (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </symbol>
            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </symbol>
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
          </svg>
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <i class="fa fa-info-circle me-2" aria-hidden="true"></i>{resMsg}
          </div>
        </>
      )}

      {/* <!--Login Form--> */}
      <form onSubmit={submitFormLogin}>
        <div className="form-group">
          <label>{t('label_new_password')}</label>
          <input type="password" name="password" value={password} onChange={(e) => onChangeValueHandler(e)}
            required minLength={8}
          />
          <small className="text-danger">{errors?.msg && "* " + errors?.msg}</small>
        </div>

        <div className="form-group">
          <label>{t(label_confirm_password)}</label>
          <input type="password" name="cfPassword" value={cfPassword} onChange={(e) => onChangeValueHandler(e)}
            required minLength={8}
          />
        </div>
        {/* name */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            disabled={loading}
          >
            {loading ? t('button_loading') : t('button_submit')}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          {t('text_resend')}{" "}
          <Link
            href="/forget-password"
            className="call-modal signup"
          >
            {t('link_resend')}
          </Link>
        </div>

        <div className="divider">
          <span>{t('or')}</span>
        </div>
        <div className="form-group">
          <Link href={"/login"}>
          <button
            className="theme-btn btn-style-three"
            type="button"
            name="log-in"
            disabled={loading}
          >
            {loading ? t('button_loading') : t('link_login')}
          </button>
          </Link>
        </div>

      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;