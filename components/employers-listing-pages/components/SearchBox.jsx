import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompanyName } from "../../../app/features/filter/employerFilterSlice";
import { useTranslation } from "react-i18next";

const SearchBox = () => {

    const { t } = useTranslation('employers')
    const { companyName } = useSelector((state) => state.employerFilter);
    const [getKeyWord, setkeyWord] = useState(companyName);
    const dispath = useDispatch();

    // keyword handler
    const keywordHandler = (e) => {
        dispath(addCompanyName(e.target.value));
    };

    useEffect(() => {
        setkeyWord(companyName);
    }, [setkeyWord, companyName]);

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
