import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
const Candidates = dynamic(() =>
  import("../components/candidates-listing-pages/candidates-list-v1")
);
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "candidates"])),
      // Will be passed to the page component as props
    },
  };
}

const Index = () => {
  
  const { t } = useTranslation("candidates");

  return (
    <>
      <Seo pageTitle={t('page_title')} />
      <Candidates />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
