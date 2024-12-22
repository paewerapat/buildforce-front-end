import { useDispatch, useSelector } from "react-redux";
import { getMoreCandidatesAction } from "../../../app/actions/candidateAction";
import Loading from "../../notification/Loading";
import { useTranslation } from "react-i18next";
const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT;

const ListingShowing = () => {

  const { t } = useTranslation('common')
  const { candidate, candidateFilter } = useSelector(state => state);
  const dispatch = useDispatch()

  function loadMoreHandle() {
    dispatch(getMoreCandidatesAction({ page: candidate.page, candidateFilter }))
  }

  function scrollToTop() {
    window.scrollTo({ top: '60px', behavior: 'smooth' })
  }

  return (
    <>
    {
      candidate.loading && <Loading />
    }
    {
      candidate.result < limit * candidate.page
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
