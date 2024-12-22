import { useDispatch, useSelector } from "react-redux";
import { getMoreEmployersAction } from "../../../app/actions/employerAction";
import { useTranslation } from "react-i18next";
const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT;

const ListingShowing = () => {

  const { t } = useTranslation('common')
  const { employer, employerFilter } = useSelector(state => state);
  const dispatch = useDispatch()

  function loadMoreHandle() {
    dispatch(getMoreEmployersAction({ page: employer.page, employerFilter }))
  }

  function scrollToTop() {
    window.scrollTo({ top: '60px', behavior: 'smooth' })
  }

  return (
    <>
    {
      employer.result < limit * employer.page
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
