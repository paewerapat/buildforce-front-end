import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginWithSocial from "./LoginWithSocial";
import { checkPasswordStrength } from '../../../../utils/strengthPassword'
import Loading from "../../../notification/Loading";
import { useTranslation } from "react-i18next";

const FormContent = ({type, cookies}) => {

  const { t } = useTranslation('register')
  const router = useRouter();
  const initialState = {
    email: "", password: "", cfPassword: "", type: type
  }
  const [formRegister, setFormRegister] = useState(initialState);
  const { email, password, cfPassword } = formRegister;

  const initialErrorState = {
    email: '', password: ''
  }
  const [errors, setErrors] = useState(initialErrorState)
  const [loading, setLoading] = useState(false);

  function onChangeFormRegister(event) {
    const { value, name } = event.target;
    setFormRegister({...formRegister, [name]:value})
  }

  async function submitFormRegister(event) {
    event.preventDefault();
    setLoading(true)
    // Check password and confirm-password is match
    if(password !== cfPassword) {
      setLoading(false)
      setFormRegister({...formRegister, password: "", cfPassword: ""})
      return setErrors({...errors, password: 'Password and confirm password mismatch'})
    }
    const checkPassword = checkPasswordStrength(password)
    if(checkPassword.strength <= 2) {
      setLoading(false)
      return setErrors({...errors, password: checkPassword.tip})
    }
    axios.post("/api/register", formRegister).then(res => {
      setLoading(false)
      const response = res.data;
      return router.push(`/login?message=${response.msg}`)
    }).catch(err => {
      setLoading(false)
      console.log("[register-error] catch - ", err)
      return setErrors(err.response.data.msg);
    })
  }

  return (
    <>
    <form onSubmit={submitFormRegister}>
      {
        loading && <Loading />
      }
      <div className="form-group">
        <label>{t('label_email')}</label>
        <input type="email" name="email" placeholder="buidlforce@gmail.com" value={cookies ? cookies.email : email} 
          onChange={(e) => onChangeFormRegister(e)} 
          required 
        />
        <small className="text-danger">{errors?.email && "* " + errors?.email}</small>
      </div>
      {/* name */}

      <div className="form-group">
        <label>{t('label_password')}</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder={"Password"}
          minLength={8}
          value={password}
          onChange={(e) => onChangeFormRegister(e)}
          required
        />
        <small className="text-danger">{errors?.password && "* " + errors?.password}</small>
      </div>

      <div className="form-group">
        <label>{t('label_cf_password')}</label>
        <input
          id="cf-password-field"
          type="password"
          name="cfPassword"
          placeholder={"Password"}
          minLength={8}
          value={cfPassword}
          onChange={(e) => onChangeFormRegister(e)}
          required
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
          {loading ? t('button_loading') : t('button_register')}
        </button>
      </div>
      {/* login */}
    </form>

    <div className="bottom-box">
      <div className="text">
        {t('text_have_account')}{" "}
        <Link
          href="/login"
          className="call-modal login"
        >
          {t('link_login')}
        </Link>
      </div>
      <div className="divider">
        <span>{t('or')}</span>
      </div>
      <LoginWithSocial type={type} cookies={cookies} />
    </div>
    {/* End bottom-box LoginWithSocial */}
    </>
  );
};

export default FormContent;
