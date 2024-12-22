import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ShortlistedResumes from "../../../components/dashboard-pages/employers-dashboard/shortlisted-resumes";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'dashboard/employer/shortlisted_resume',
        'dashboard/employer/menu',
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/shortlisted_resume')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <ShortlistedResumes />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
