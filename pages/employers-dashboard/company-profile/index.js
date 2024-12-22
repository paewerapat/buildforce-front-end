import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import axios from "../../../lib/axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const CompanyProfile = dynamic(() => import('../../../components/dashboard-pages/employers-dashboard/company-profile'), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'dashboard/employer/company_profile',
        'dashboard/employer/menu',
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/company_profile')
  const { user } = useSelector(state => state)
  const [data, setData] = useState({})

  useEffect(() => {
    axios.post(`/api/employers/profile`, {
      id: user?.id
    }).then(({data}) => setData(data))
  }, [])

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <CompanyProfile data={data} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
