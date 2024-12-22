import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../../app/features/filter/jobFilterSlice";
import { useTranslation } from "react-i18next";

const ExperienceLevel = () => {

    const { t } = useTranslation('jobs')
    const { experience } = useSelector(state => state.jobFilter);
    const dispatch = useDispatch();

    // experience handler
    const experienceHandler = (e) => {
        dispatch(addExperience(e.target.value));
    };

    return (
        <>
        <select name="experience-level" className="form-select"
            onChange={(e) => experienceHandler(e)}
            value={experience}
        >
            <option defaultValue={""}>{t('filter_experience_plaecholder_default')}</option>
            <option value={0}>{t('filter_experience_plaecholder_new_graduates')}</option>
            <option value={1}>1 {t('filter_experience_plaecholder_year')}</option>
            <option value={2}>2 {t('filter_experience_plaecholder_years')}</option>
            <option value={3}>3 {t('filter_experience_plaecholder_years')}</option>
            <option value={5}>5 {t('filter_experience_plaecholder_years')}</option>
        </select>
        <span className="icon flaticon-checked"></span>
        </>
    );
};

export default ExperienceLevel;
