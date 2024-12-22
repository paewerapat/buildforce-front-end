import { useState } from "react";
import ListingShowing from "../../../candidates-dashboard/short-listed-jobs/components/ListingShowing";
import CandidateCard from "./CandidateCard";
import { useSelector } from "react-redux";

const CandidateContentBox = () => {

  const { candidates: data } = useSelector(state => state.shortlistedByEmployer);
  const result = data?.length || 0
  const [page, setPage] = useState(1)

  return (
    <div className="widget-content">
      <div className="row">
        {
          data?.map((shortlisted) => (
            <CandidateCard data={shortlisted} key={shortlisted.id} />
          ))
        }
        <ListingShowing result={result} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default CandidateContentBox;
