import InputRange from "react-input-range";

const DestinationRangeSlider = () => {
    return (
        <div className="range-slider-one">
            <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                maxValue={100}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="area-amount">0</span>km
                </div>
            </div>
        </div>
    );
};

export default DestinationRangeSlider;
