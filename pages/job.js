import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
const JobList = dynamic(() => import('../components/job-listing-pages/job-list'), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'jobs'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('jobs')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <JobList />
    </>
  );
};

export default Index;
