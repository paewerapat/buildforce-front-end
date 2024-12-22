import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loading from "../../../notification/Loading";
import { useTranslation } from 'next-i18next'

const FormContent = () => {

  const { t } = useTranslation('login')
  const searchParam = useSearchParams();
  const router = useRouter();
  const initialState = {
    email: "", password: ""
  }
  const [formRegister, setFormRegister] = useState(initialState);
  const { email, password } = formRegister;

  const initialErrorState = {
    email: "", password: ""
  }
  const [errors, setErrors] = useState(initialErrorState);
  const [loading, setLoading] = useState(false);

  function onChangeFormRegister(event) {
    const { value, name } = event.target;
    setFormRegister({...formRegister, [name]:value})
  }

  async function submitFormLogin(event) {
    event.preventDefault();
    // dispatch(signInAction(formRegister))
    setLoading(true)
    axios.post("/api/login", formRegister).then( async res => {
      const response = res.data;
      const credentials = await signIn("credentials", {
        email: response.email,
        redirect: false
      })
      if (credentials.status === 200) {
        toast.success("Log in successfully")
        return setTimeout(() => {
          router.push('/')
        }, [1000])
      } else {
        setLoading(false)
        return toast.error(credentials.error)
      }
    }).catch(error => {
      setLoading(false)
      console.log("[login-error] - ", error)
      setErrors({msg: t(error.response.data.msg)})
    })
  }

  return (
    <div className="form-inner">
      <h3>{t('login_h3_title')}</h3>

      {
        loading && <Loading />
      }

      {/* Alert Success from register page */}
      {searchParam.get("message") && (
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
            <i class="fa fa-check-circle me-2" aria-hidden="true"></i>{searchParam.get("message")}
          </div>
        </>
      )}

      {/* <!--Login Form--> */}
      <form onSubmit={submitFormLogin}>
        <div className="form-group">
          <label>{t('label_email_username')}</label>
          <input type="text" name="email" value={email} onChange={(e) => onChangeFormRegister(e)}
            placeholder="buidlforce@gmail.com" required 
          />
          <small className="text-danger">{errors?.msg && "* " + errors.msg}</small>
        </div>
        {/* name */}

        <div className="form-group">
          <label>{t('label_password')}</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            minLength={8}
            onChange={(e) => onChangeFormRegister(e)}
            required
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
            </div>
            <Link href="/forget-password" className="pwd">
              {t('label_forget_password')}
            </Link>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            disabled={loading}
          >
            {loading ? t('button_loading') : t('button_login')}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          {t('text_no_account')}
          <Link
            href="/register"
            className="call-modal signup"
          >
            {t('link_register')}
          </Link>
        </div>

        <div className="divider">
          <span>{t('or')}</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
