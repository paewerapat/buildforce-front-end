import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
const ResumeAlerts = dynamic(() => import("../../../components/dashboard-pages/employers-dashboard/resume-alerts"), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'dashboard/employer/notifications',
        'dashboard/employer/menu',
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/notifications')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <ResumeAlerts />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
