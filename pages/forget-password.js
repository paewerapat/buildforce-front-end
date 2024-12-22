import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";
const ForgetPassword = dynamic(() => import('../components/pages-menu/forget-password'), { ssr: false })

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'forget_password',
        'common'
      ])),
      session,
    },
  }
}

const Index = () => {

  const { t } = useTranslation('forget_password')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <ForgetPassword />
    </>
  );
};

export default Index;
