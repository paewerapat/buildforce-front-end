import { useDispatch, useSelector } from "react-redux";
import { addQualification } from "../../../app/features/filter/candidateFilterSlice";
import qualificationType from "../../../data/qualification";
import { useTranslation } from "react-i18next";


const Qualification = () => {

    const { t } = useTranslation('candidates')
    const { qualification } = useSelector((state) => state.candidateFilter) || {};
    const dispatch = useDispatch();

    // qualification handler
    const qualificationHandler = (e) => {
        dispatch(addQualification(e.target.value));
    };

    return (
        <>
        <select name="" id=""
            className="form-select"
            value={qualification}
            onChange={(e) => qualificationHandler(e)}
        >
            <option value="">{t('filter_qualification_placeholder')}</option>
            {
                qualificationType.map((item) => (
                    <option key={item.id} value={item.value}>{item.label}</option>
                ))
            }
        </select>
        <span className="icon flaticon-checked"></span>
        </>
    );
};

export default Qualification;
