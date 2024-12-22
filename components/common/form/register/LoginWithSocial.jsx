import { setCookie } from "cookies-next";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginWithSocial = ({type, cookies}) => {

  async function signUpWithGoogleHandler() {
    try {
      setCookie('userType', type);
      await signIn("google")
    } catch (error) {
      console.log("[signUpWithGoogleHandler] error - ", error)
      return toast.error(error)
    }
  }

  return (
    <div className="btn-box row justify-content-center">
      <div className="col-md-12">
        <button type="button" className="theme-btn social-btn-two google-btn" onClick={() => signUpWithGoogleHandler()}>
          <i className="fab fa-google"></i> Register via Gmail
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
