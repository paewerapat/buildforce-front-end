import { useDispatch, useSelector } from "react-redux";
import { addJobPosition } from "../../../app/features/filter/jobFilterSlice";
import jobPositions from "../../../data/jobPositions";
import { useTranslation } from "react-i18next";

const JobType = () => {

    const { t } = useTranslation('jobs')
    const { jobPosition } = useSelector(state => state.jobFilter)
    const dispatch = useDispatch();

    // dispatch job-type
    const jobTypeHandler = (e) => {
        dispatch(addJobPosition(e.target.value));
    };

    return (
        <>
        <select name="experience-level" className="form-select"
            onChange={(e) => jobTypeHandler(e)}
            value={jobPosition}
        >
            <option value="">{t('filter_job_type_placeholder')}</option>
            {
                jobPositions.map((item) => (
                    <option value={item.value} key={item.id}>
                        {item.label}
                    </option>
                ))
            }
        </select>
        <span className="icon flaticon-user-1"></span>
        </>
    );
};

export default JobType;
