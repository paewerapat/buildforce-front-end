import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]";
const ResetPassword = dynamic(() => import('../components/pages-menu/reset-password'), { ssr: false })
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

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
        'reset_password',
        'common'
      ])),
      session,
    },
  }
}

const Index = () => {

  const { t } = useTranslation('reset_password')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <ResetPassword />
    </>
  );
};

export default Index;