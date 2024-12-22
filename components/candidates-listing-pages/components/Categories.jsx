import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobPosition } from "../../../app/features/filter/candidateFilterSlice";
import jobPositionData from "../../../data/jobPositions";
import { useTranslation } from "react-i18next";

const Categories = () => {

    const { t } = useTranslation('candidates')
    const { jobPosition } = useSelector((state) => state.candidateFilter) || {};
    const [getJobPosition, setJobPosition] = useState(jobPosition || "")
    const dispatch = useDispatch();

    // category handler
    const jobPositionHandler = (e) => {
        const { value } = e.target
        setJobPosition(value)
        dispatch(addJobPosition(value));
    };

    return (
        <>
            <select
                onChange={jobPositionHandler}
                value={getJobPosition}
                className="form-select"
            >
                <option value="">{t('filter_job_position_placeholder')}</option>
                {jobPositionData?.map((item) => (
                    <option key={item.id} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default Categories;
