import { useTranslation } from "react-i18next";

const PopularSearch = () => {

  const { t } = useTranslation('common')

  return (
    <div className="popular-searches" data-aos="fade-up" data-aos-delay="1000">
      <span>{t('under_search')}</span>
    </div>
  );
};

export default PopularSearch;
