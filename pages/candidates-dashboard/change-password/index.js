import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ChangePassword from "../../../components/dashboard-pages/candidates-dashboard/change-password";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/candidate/menu',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('common')

  return (
    <>
      <Seo pageTitle={t('change_password_page_title')} />
      <ChangePassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
