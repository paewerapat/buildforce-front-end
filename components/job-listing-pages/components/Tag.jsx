import { useDispatch, useSelector } from "react-redux";
import specialismsType from "../../../data/specialisms";
import Select from "react-select";
import { addSpecialisms } from "../../../app/features/filter/jobFilterSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Tag = () => {

    const router = useRouter();
    const { specialisms: queryFilter } = router.query
    const { specialisms } = useSelector(state => state.jobFilter)
    const [specialismsData, setSpecialismsData] = useState(specialisms.map(item => {
        return { value: item, label: item}
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        setSpecialismsData(specialisms.map(item => {
            return { value: item, label: item}
        }))
    }, [specialisms])

    useEffect(() => {
        if(queryFilter) {
            dispatch(addSpecialisms([ queryFilter ]))
            setSpecialismsData([{ value: queryFilter, label: queryFilter }])
        }
    }, [])

    return (
        <Select
            defaultValue={specialismsData}
            value={specialismsData}
            isMulti
            required
            name="colors"
            options={specialismsType}
            onChange={(e) => dispatch(addSpecialisms(e.map((item) => {
                return item.value
            })))
            }
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
};

export default Tag;
