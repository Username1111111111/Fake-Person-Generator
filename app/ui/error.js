import { useState, useEffect } from 'react';

export default function Error({ errors, setErrors }) {
    const [inputValue, setInputValue] = useState(errors);
    const [debouncedValue, setDebouncedValue] = useState(errors);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Debounce function
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 700); // 0.7 seconds delay

        return () => clearTimeout(timer);
    }, [inputValue]);

    // Update errors based on debounced value
    useEffect(() => {
        const isNumber = /^(\d+\.?\d*|\.\d+)$/.test(debouncedValue);

        if (isNumber || debouncedValue === '') {
            let numericValue = debouncedValue === '' ? 0 : parseFloat(debouncedValue);
            numericValue = (Math.round(numericValue / 0.25) * 0.25).toFixed(2);
            setErrors(Math.max(0, Math.min(1000, numericValue)));
        }
    }, [debouncedValue]);

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
                value={inputValue}
                onChange={handleInputChange}
                className="form-range me-2"
            />
            <input
                type="text"
                id="errors"
                name="errors"
                required
                pattern="^\d+(\.\d{0,2})?$"
                value={inputValue}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>
    );
}
