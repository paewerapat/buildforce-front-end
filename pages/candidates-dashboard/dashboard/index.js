import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
const DashboadHome = dynamic(() => import("../../../components/dashboard-pages/candidates-dashboard/dashboard"), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/candidate/menu',
        'dashboard/candidate/dashboard'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

    const { t } = useTranslation('dashboard/candidate/dashboard')

    return (
        <>
            <Seo pageTitle={t('page_title')} />
            <DashboadHome />
        </>
    );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
