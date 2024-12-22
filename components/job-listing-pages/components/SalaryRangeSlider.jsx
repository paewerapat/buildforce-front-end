import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { addSalary } from "../../../app/features/filter/jobFilterSlice";

const SalaryRangeSlider = () => {
    const { salary } = useSelector((state) => state.jobFilter);
    const [getSalary, setSalary] = useState({
        min: salary.min,
        max: salary.max,
    });

    const dispatch = useDispatch();

    const handleOnChange = ({ min, max }) => {
        dispatch(addSalary({ min, max }));
    };

    useEffect(() => {
        setSalary({
            min: salary.min,
            max: salary.max,
        });
    }, [setSalary, salary]);

    return (
        <div className="range-slider-one salary-range">
            <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                maxValue={1000000}
                value={{
                    min: getSalary.min,
                    max: getSalary.max,
                }}
                onChange={(value) => handleOnChange(value)}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="d-inline-flex align-items-center">
                        <span className="min">${salary.min}</span>
                        <span className="max ms-2">${salary.max}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SalaryRangeSlider;
