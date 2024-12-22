import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Aos from "aos";
import "aos/dist/aos.css";
import { SessionProvider, getSession } from "next-auth/react";
import { appWithTranslation } from 'next-i18next';
import App from "next/app";
import dynamic from "next/dynamic";
import NextTopLoader from 'nextjs-toploader';
import { useEffect } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../app/features/auth/userSlice";
import { initializeStore } from "../app/store";
import ScrollToTop from "../components/common/ScrollTop";
import "../styles/index.scss";
const ToastContainer = dynamic(() => import('react-toastify').then((module) => module.ToastContainer), {
  ssr: false, // Disable server-side rendering
})
const Alert = dynamic(() => import('../components/notification/Alert'), { ssr: false })


if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}


function MyApp({ Component, pageProps, session, initialReduxState }) {

  const store = initializeStore(initialReduxState)
  
  // aos animation activation
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <div className="page-wrapper">
            <Analytics />
            <Component {...pageProps} />
            <NextTopLoader
              showSpinner={false}
            />
            <SpeedInsights />
            <Alert />
            {/* <Alert /> */}

            {/* Toastify */}
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {/* <!-- Scroll To Top --> */}
            <ScrollToTop />
          </div>
        </Provider>
      </SessionProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const session = await getSession(appContext.ctx);

  const store = initializeStore();
  // Run the dispatched actions
  if(session?.user) store.dispatch(getUser(session?.user))
  // Retrieve the initial state
  const initialReduxState = store.getState();

  // Run page-level getInitialProps
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { 
    ...appProps, session, pageProps, initialReduxState
  };
};

export default appWithTranslation(MyApp);
