import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Seo from "../../../components/common/Seo";
import axios from "../../../lib/axios";
const CvManager = dynamic(() => import('../../../components/dashboard-pages/candidates-dashboard/cv-manager'), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/candidate/menu',
        'dashboard/candidate/cv_manager'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/candidate/cv_manager')
  const { candidateInfo } = useSelector(state => state.user)
  const [data, setData] = useState({})

  useEffect(() => {
    axios.post(`/api/candidates/profile/cv`, {
      id: candidateInfo?.id
    }).then(({data}) => setData(data))
  }, [])

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <CvManager data={data} />
    </>
  );
};

export default Index;
