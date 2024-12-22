import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ManageJobs from "../../../components/dashboard-pages/employers-dashboard/manage-jobs";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'dashboard/employer/manage_job',
        'dashboard/employer/menu',
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/manage_job')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <ManageJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
