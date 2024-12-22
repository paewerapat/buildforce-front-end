import { useState } from "react";
import Applicants from "./ApplicantCard";
import { useSelector } from "react-redux";
import ListingShowing from "../../../candidates-dashboard/short-listed-jobs/components/ListingShowing";

const ApplicantContentBox = () => {

  const { applicants: data } = useSelector(state => state.shortlistedByEmployer);
  const result = data?.length || 0
  const [page, setPage] = useState(1)

  return (
    <div className="widget-content">
      <div className="row">
        {
          data?.map((shortlisted) => (
            <Applicants data={shortlisted} key={shortlisted.id} />
          ))
        }
        <ListingShowing result={result} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ApplicantContentBox;
