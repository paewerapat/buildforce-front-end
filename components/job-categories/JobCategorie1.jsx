import Link from "next/link";
import jobCatContent from "../../data/job-catergories";
import { useSelector } from "react-redux";

const JobCategorie1 = () => {

  const { topCategories } = useSelector(state => state.homePage)

  return (
    <>
      {topCategories.map((item) => (
        <div
          className="category-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box">
            <div className="content">
              <span className={`icon ${item.icon}`}></span>
              <h4>
                <Link href={`/job?position=${item.jobPosition}&options=true`}>{item.jobPosition}</Link>
              </h4>
              <p>({item.jobListing} open positions)</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie1;
