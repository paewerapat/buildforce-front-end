import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home4 from "../components/home-4";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('home')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <Home4 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
