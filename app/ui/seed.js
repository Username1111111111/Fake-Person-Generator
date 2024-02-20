export default function Seed({ seed, setSeed }) {
    const handleInputChange = (e) => {
        const seedValue = e.target.value;
        const isNumber = /^\d*$/.test(seedValue);

        if (isNumber) {
            const numericSeed = seedValue === '' ? 0 : parseInt(seedValue, 10);
            setSeed(numericSeed);
        } else {
            e.preventDefault();
        }
    };

    return (
        <div className="d-flex align-items-center">
            <label htmlFor="seed" className="me-2">
                Seed:
            </label>
            <input
                type="text"
                id="seed"
                name="seed"
                required
                minLength="1"
                maxLength="7"
                size="7"
                value={seed}
                onChange={handleInputChange}
                className="form-control me-2"
            />
            <button
                style={{
                    width: "37px",
                    height: "37px",
                    backgroundImage: `url('/shuffle.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    border: "none",
                }}
                className="btn"
                onClick={() =>
                    setSeed(
                        Math.floor(Math.random() * 10000000)
                            .toString()
                            .padStart(7, "0")
                    )
                }
            ></button>
        </div>
    );
}
