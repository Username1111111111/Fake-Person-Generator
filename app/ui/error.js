import { useState } from 'react';

export default function Error({ errors, setErrors }) {
    const [sliderValue, setSliderValue] = useState(errors);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleSliderMouseUp = () => {
        updateErrors(sliderValue);
    };

    const handleInputChange = (e) => {
        setSliderValue(e.target.value);
        updateErrors(e.target.value);
    };

    const updateErrors = (value) => {
        // Use a regex pattern that matches only numbers or decimal numbers
        const isNumber = /^(\d+\.?\d*|\.\d+)$/.test(value);

        if (isNumber || value === '') {
            // If it's a number or an empty string, update errors
            let numericValue = value === '' ? 0 : parseFloat(value);
            // Round to nearest step (0.25) and limit to two decimal places
            numericValue = (Math.round(numericValue / 0.25) * 0.25).toFixed(2);
            setErrors(Math.max(0, Math.min(1000, numericValue)));
        }
    };

    return (
        <div className="d-flex align-items-center">
            <label htmlFor="error" className="me-2">Errors:</label>
            <input
                type="range"
                id="error"
                name="error"
                min="0"
                max="10"
                step="0.25"
                value={sliderValue}
                onChange={handleSliderChange}
                onMouseUp={handleSliderMouseUp}
                className="form-range me-2"
            />
            <input
                type="text"
                id="errors"
                name="errors"
                required
                pattern="^\d+(\.\d{0,2})?$"
                value={sliderValue}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>
    );
}
