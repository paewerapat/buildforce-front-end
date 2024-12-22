import { setCookie } from "cookies-next";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginWithSocial = () => {

  async function signInWithGoogleHandler() {
    try {
      setCookie('userType', null);
      await signIn("google")
    } catch (error) {
      console.log("[signInWithGoogleHandler] error - ", error)
      return toast.error(error)
    }
  }

  return (
    <div className="btn-box row justify-content-center">
      <div className="col-md-12">
        <button type="button" className="theme-btn social-btn-two google-btn" onClick={() => signInWithGoogleHandler()}>
          <i className="fab fa-google"></i> Log In via Gmail
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
