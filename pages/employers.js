import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import EmployersListV2 from '../components/employers-listing-pages/employers-list-v2';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'employers'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('employers')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <EmployersListV2 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
