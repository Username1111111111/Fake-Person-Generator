export default function ExportCSV({ exportCSV }) {
    return (
        <button className="btn btn-success" onClick={exportCSV}>
            Export CSV
        </button>
    );
}
