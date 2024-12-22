const limit = process.env.NEXT_PUBLIC_QUERY_LIMIT || 10;

const ListingShowing = ({ setPage, page, result}) => {

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
