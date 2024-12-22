import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobTitle } from "../../../app/features/filter/jobFilterSlice";
import { useTranslation } from "react-i18next";

const SearchBox = () => {

    const { t } = useTranslation('jobs')
    const { jobTitle } = useSelector((state) => state.jobFilter);
    const [getKeyWord, setkeyWord] = useState(jobTitle);
    const dispath = useDispatch();

    // keyword handler
    const keywordHandler = (e) => {
        dispath(addJobTitle(e.target.value));
    };

    useEffect(() => {
        setkeyWord(jobTitle);
    }, [setkeyWord, jobTitle]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('filter_search_placeholder')}
                value={getKeyWord}
                onChange={keywordHandler}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
