import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import nookies, { destroyCookie } from 'nookies';
import Seo from "../components/common/Seo";
import { getNextAuthOptions } from "./api/auth/[...nextauth]";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";
const Register = dynamic(() => import('../components/pages-menu/register'), { ssr: false })

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, getNextAuthOptions(context.req, context.res))
  const cookies = nookies.get(context);
  destroyCookie(context, "providerMessage")
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
        'register',
        'common'
      ])),
      cookies,
    },
  }
}

const Index = ({cookies}) => {

  const { t } = useTranslation('register')

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <Register cookies={cookies?.providerMessage ? JSON?.parse(cookies?.providerMessage) : null } />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index));
