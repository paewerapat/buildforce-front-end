import { useDispatch, useSelector } from "react-redux";
import { getMoreJobsByEmployerAction } from "../../../../../app/actions/employer/jobAction";
import { useTranslation } from "react-i18next";
const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT;

const ListingShowing = () => {

  const { t } = useTranslation('common')
  const { jobByEmployer: jobs, user } = useSelector(state => state);
  const dispatch = useDispatch()

  function loadMoreHandle() {
    dispatch(getMoreJobsByEmployerAction({ employer: user?.employerInfo?.id, page: jobs.page, jobFilter: jobs.filter }))
  }

  function scrollToTop() {
    window.scrollTo({ top: '60px', behavior: 'smooth' })
  }

  return (
    <>
    {
      jobs.result < limit * jobs.page
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
