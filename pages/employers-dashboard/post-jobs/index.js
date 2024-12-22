import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import axios from "../../../lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const PostJob = dynamic(() => import('../../../components/dashboard-pages/employers-dashboard/post-jobs'), { ssr: false })

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'dashboard/employer/post_job',
        'dashboard/employer/menu',
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('dashboard/employer/post_job')
  const router = useRouter();
  const { id, edit } = router.query;
  const [data, setData] = useState(null)

  useEffect(() => {
    if(edit === 'true') axios.post(`/api/jobs/${id}`)
      .then(({data}) => setData(data))
  }, [])

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <PostJob data={data} edit={edit} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
