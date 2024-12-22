import { useTranslation } from "react-i18next";

const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT || 10;

const ListingShowing = ({ setPage, page, result}) => {

  const { t } = useTranslation('common')
  function loadMoreHandle() {
    setPage(page + 1)
  }

  function scrollToTop() {
    window.scrollTo({ top: '60px', behavior: 'smooth' })
  }

  return (
    <>
    {
      result < limit * page
      ?
      <div className="ls-show-more">
        <p>{t('listing_showing_p')}</p>
        <div className="bar">
          <span className="bar-inner" style={{ width: "100%" }}></span>
        </div>
        <button className="show-more" type="button" onClick={() => scrollToTop()}>
          {t('listing_showing_back')}
        </button>
      </div>
      :
      <div className="ls-show-more">
        <button className="show-more" type="button" onClick={() => loadMoreHandle()}>
          {t('listing_showing_more')}
        </button>
      </div>
    }
    </>
  );
};

export default ListingShowing;
