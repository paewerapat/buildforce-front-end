import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
const AllApplicants = dynamic(() => import('../../../components/dashboard-pages/employers-dashboard/all-applicants'), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/employer/menu',
        'dashboard/employer/all_applicants'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/all_applicants')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <AllApplicants />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
