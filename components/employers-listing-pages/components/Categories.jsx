import { useDispatch, useSelector } from "react-redux";
import industryType from '../../../data/industry'
import { useEffect, useState } from "react";
import { addIndustry } from "../../../app/features/filter/employerFilterSlice";
import { useTranslation } from "react-i18next";

const Categories = () => {

    const { t } = useTranslation('employers')
    const { industry } = useSelector(
        (state) => state.employerFilter
    );
    const [getIndustry, setIndustry] = useState(industry)
    const dispatch = useDispatch();

    const industryHandler = (e) => {
        dispatch(addIndustry(e.target.value));
    };

    useEffect(() => {
        setIndustry(industry)
    }, [industry, setIndustry])

    return (
        <>
            <select
                className="form-select"
                value={getIndustry}
                onChange={(e) => industryHandler(e)}
            >
                <option value="">{t('Choose a industry')}</option>
                {industryType?.map((item) => (
                    <option value={item.value} key={item.id}>
                        {item.label}
                    </option>
                ))}
            </select>
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default Categories;
