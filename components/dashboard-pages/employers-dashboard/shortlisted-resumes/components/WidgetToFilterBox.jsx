const WidgetToFilterBox = () => {
  return (
    <div className="chosen-outer">
      {/* <!--search box--> */}
      <div className="search-box-one">
        <form method="post" action="blog.html">
          <div className="form-group">
            <span className="icon flaticon-search-1"></span>
            <input
              type="search"
              name="search-field"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
      {/* End searchBox one */}
    </div>
  );
};

export default WidgetToFilterBox;
