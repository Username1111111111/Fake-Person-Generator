import Error from "./error";
import Region from "./region";
import Seed from "./seed";
import ExportCSV from "./exportCSV";

export default function Header({ region, setRegion, errors, setErrors, seed, setSeed, exportCSV }) {
    return (
        <header className="d-flex justify-content-around">
            <div className="p-2">
                <Region region={region} setRegion={setRegion}></Region>
            </div>
            <div className="p-2">
                <Error errors={errors} setErrors={setErrors}></Error>
            </div>
            <div className="p-2">
                <Seed seed={seed} setSeed={setSeed}></Seed>
            </div>
            <div className="p-2">
                <ExportCSV exportCSV={exportCSV}></ExportCSV>
            </div>
        </header>
    );
}
