import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../../app/features/filter/candidateFilterSlice";
import experienceType from '../../../data/experiences'
import { useTranslation } from "react-i18next";

const Experience = () => {

    const { t } = useTranslation('candidates')
    const { experience } = useSelector((state) => state.candidateFilter) || {};
    const dispatch = useDispatch();

    // experience handler
    const experienceHandler = (e) => {
        dispatch(addExperience(parseInt(e.target.value)));
    };

    return (
        <>
        <select
            onChange={experienceHandler}
            value={experience}
            className="form-select"
        >
            <option value="">{t('filter_experience_placeholder')}</option>
            {experienceType?.map((item) => (
                <option key={item.id} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
        <span className="icon flaticon-checked"></span>
        </>
    );
};

export default Experience;
