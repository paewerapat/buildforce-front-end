import dynamic from "next/dynamic";
import Link from "next/link";
import Seo from "../components/common/Seo";
import Image from "next/image";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index = () => {

  const { t } = useTranslation('common')
  
  return (
    <>
      <Seo pageTitle="Page Not Found" />
      <div
        className="error-page-wrapper "
        style={{
          backgroundImage: `url(/images/404.jpg)`,
        }}
        data-aos="fade"
      >
        <div className="content">
          <div className="logo">
            <Link href="/">
              <Image width={240} height={120} src="/images/logo-wb-bi-bf.png" alt="brand" />
            </Link>
          </div>
          {/* End logo */}

          <h1>404!</h1>
          <p>
            {t('404_p')}
          </p>

          <Link className="theme-btn btn-style-three call-modal" href="/">
            {t('404_link')}
          </Link>
        </div>
        {/* End .content */}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
