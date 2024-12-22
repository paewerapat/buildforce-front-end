import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ShortListedJobs from "../../../components/dashboard-pages/candidates-dashboard/short-listed-jobs";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/candidate/menu',
        'dashboard/candidate/shortlisted'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/candidate/shortlisted')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <ShortListedJobs t={t} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
