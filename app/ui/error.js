export default function Error({ errors, setErrors }) {
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Use a regex pattern that matches only numbers or decimal numbers
        const isNumber = /^(\d+\.?\d*|\.\d+)$/.test(value);

        if (isNumber || value === '') {
            // If it's a number or an empty string, update errors
            let numericValue = value === '' ? 0 : parseFloat(value);
            // Round to nearest step (0.25) and limit to two decimal places
            numericValue = (Math.round(numericValue / 0.25) * 0.25).toFixed(2);
            setErrors(Math.max(0, Math.min(1000, numericValue)));
        } else {
            // If it's not a number, don't update errors
            e.preventDefault();
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
                value={errors}
                onChange={handleInputChange}
                className="form-range me-2"
            />
            <input
                type="text"
                id="errors"
                name="errors"
                required
                pattern="^\d+(\.\d{0,2})?$" // Allow only numeric values with up to 2 decimal places
                value={errors}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>
    );
}
