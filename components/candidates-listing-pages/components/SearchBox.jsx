import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFullName } from "../../../app/features/filter/candidateFilterSlice";
import { useTranslation } from "react-i18next";

const SearchBox = () => {

    const { t } = useTranslation('candidates')
    const { fullName } = useSelector((state) => state.candidateFilter);
    const [getKeyword, setKeyword] = useState(fullName || "");

    const dispatch = useDispatch();

    // keyword handler
    const keywordHandler = (e) => {
        dispatch(addFullName(e.target.value));
    };

    useEffect(() => {
        setKeyword(fullName)
    }, [fullName, setKeyword])

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('filter_search_placeholder')}
                onChange={keywordHandler}
                value={getKeyword || ''}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
