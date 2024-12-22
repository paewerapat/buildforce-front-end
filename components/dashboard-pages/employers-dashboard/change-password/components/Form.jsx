import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../../../lib/axios";
import { checkPasswordStrength } from "../../../../../utils/strengthPassword";
import Loading from "../../../../notification/Loading";
import { useTranslation } from "react-i18next";

const Form = ({ google }) => {

  const { t } = useTranslation('common')
  const { user } = useSelector(state => state)

  const errorInitialState = {
    msg: "", password: ""
  }
  const [errors, setErrors] = useState(errorInitialState);
  const [loading, setLoading] = useState(false)
  const initialState = {
    oldPassword: '', newPassword: '', cfNewPassword: '',
  }
  const [passwordState, setPasswordState] = useState(initialState)
  const { oldPassword, newPassword, cfNewPassword } = passwordState;

  function onChangeHandler(event) {
    const { value, name } = event.target;
    setPasswordState({...passwordState, [name]:value })
  }

  async function submitChangePasswordHandler(event) {
    event.preventDefault();
    setErrors(errorInitialState)
    if(newPassword !== cfNewPassword) return setErrors({...errors, msg: 'New password and confirm password mismatch'})
    const checkPassword = checkPasswordStrength(newPassword)
    if(checkPassword.strength <= 2) {
      setLoading(false)
      return setErrors({...errors, msg: checkPassword.tip})
    }
    try {
      const { data } = await axios.post('/api/user/change-password', {
        id: user.id, 
        newPassword: newPassword, 
        oldPassword: oldPassword,
      })
      toast.success(data.msg)
      setPasswordState(initialState)
    } catch (err) {
      toast.error(err.response.data.msg)
      setErrors({...errors, password: err.response.data.msg})
      setPasswordState(initialState)
    }
  }

  return (
    <form className="default-form" onSubmit={submitChangePasswordHandler}>

      {
        loading && <Loading />
      }

      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>{t('old_password')}</label>
          <input type="password" 
            required
            minLength={8}
            disabled={google}
            value={oldPassword}
            name="oldPassword"
            onChange={(e) => onChangeHandler(e)}
          />
          <small className="text-danger">{errors?.password && "* " + errors?.password}</small>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>{t('new_password')}</label>
          <input type="password" required 
            minLength={8}
            disabled={google}
            value={newPassword}
            name="newPassword"
            onChange={(e) => onChangeHandler(e)}
          />
          <small className="text-danger">{errors?.msg && "* " + errors?.msg}</small>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>{t('confirm_password')}</label>
          <input type="password" 
            required 
            minLength={8}
            disabled={google}
            value={cfNewPassword}
            name="cfNewPassword"
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one"
            disabled={google}
          >
            {t('update')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
