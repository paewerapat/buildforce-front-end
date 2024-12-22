import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import JobAlerts from "../../../components/dashboard-pages/candidates-dashboard/job-alerts";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/candidate/menu',
        'dashboard/candidate/notifications'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/candidate/notifications')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <JobAlerts t={t} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
