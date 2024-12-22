import { useDispatch, useSelector } from "react-redux";
import { getMoreApplicantByEmployerAction } from "../../../../../app/actions/employer/applicantAction";
const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT;

const ListingShowing = () => {

  const { applicantByEmployer: applicant, user } = useSelector(state => state);
  const dispatch = useDispatch()

  function loadMoreHandle() {
    dispatch(getMoreApplicantByEmployerAction({ page: applicant.page, id: user?.employerInfo?.id, filter: applicant.filter }))
  }

  function scrollToTop() {
    window.scrollTo({ top: '60px', behavior: 'smooth' })
  }

  return (
    <>
    {
      applicant.result < limit * applicant.page
      ?
      <div className="ls-show-more">
        <p>You&apos;re now Up to date.</p>
        <div className="bar">
          <span className="bar-inner" style={{ width: "100%" }}></span>
        </div>
        <button className="show-more" type="button" onClick={() => scrollToTop()}>
          Back to Top
        </button>
      </div>
      :
       <div className="ls-show-more">
        <button className="show-more" type="button" onClick={() => loadMoreHandle()}>
          Show More
        </button>
      </div>
    }
    </>
  );
};

export default ListingShowing;
