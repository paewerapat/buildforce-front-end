import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkplaceModes } from "../../../app/features/filter/jobFilterSlice";
import workplaceModesTypes from "../../../data/workplaceModesTypes"
import { useTranslation } from "react-i18next";

const Categories = () => {

    const { t } = useTranslation('jobs')
    const { workplaceModes } = useSelector((state) => state.jobFilter) || {};
    const [getCategory, setCategory] = useState(workplaceModes);

    const dispatch = useDispatch();

    // category handler
    const categoryHandler = (e) => {
        dispatch(addWorkplaceModes(e.target.value));
    };

    useEffect(() => {
        setCategory(workplaceModes);
    }, [setCategory, workplaceModes]);

    return (
        <>
            <select
                className="form-select"
                value={getCategory}
                onChange={categoryHandler}
            >
                <option value="">{t('filter_workplace_placeholder')}</option>
                {
                    workplaceModesTypes.map((item) => (
                        <option key={item.id} value={item.value}>{item.label}</option>
                    ))
                }
            </select>
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default Categories;
