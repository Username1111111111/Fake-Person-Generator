export default function TableHead({ children }) {
    return (
        <thead className="thead-dark">
            <tr>
                <th className="px-3 text-center">Index</th>
                <th className="px-3 text-center">ID</th>
                <th className="px-3 text-center">Name</th>
                <th className="px-3 text-center">Address</th>
                <th className="px-3 text-center">Phone</th>
            </tr>
        </thead>
    );
}
