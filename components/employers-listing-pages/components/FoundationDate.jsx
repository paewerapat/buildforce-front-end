import InputRange from "react-input-range";

const FoundationDate = () => {
    return (
        <div className="range-slider-one salary-range">
            <InputRange
                formatLabel={(value) => ``}
                minValue={1900}
                maxValue={2028}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="d-inline-flex align-items-center">
                        <span className="min">0</span>
                        <span className="max ms-2">100</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FoundationDate;
