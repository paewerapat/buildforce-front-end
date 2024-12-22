import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Seo from "../../../components/common/Seo";
import axios from "../../../lib/axios";
const MyResume = dynamic(() => import('../../../components/dashboard-pages/candidates-dashboard/my-resume'), { ssr: false })
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'dashboard/candidate/menu',
        'dashboard/candidate/my_resume'
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/candidate/my_resume')
  const { candidateInfo } = useSelector(state => state.user)
  const [data, setData] = useState({})
  const [resume, setResume] = useState({})

  useEffect(() => {
    axios.post('/api/candidates/profile', {
      id: candidateInfo?.id
    }).then(({data}) => setData(data))
    axios.post('/api/candidates/resume', {
      candidate: candidateInfo?.id
    }).then(({data}) => setResume(data)) 
  }, [])

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <MyResume data={data} resume={resume} t={t} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
