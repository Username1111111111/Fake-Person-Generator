export default function TableRows({ users }) {
    // The table show contain the following fields:
    // 1) Index (1, 2, 3, ...) — no errors here
    // 2) Random identifier — no errors here
    // 3) Name + middle name + last name (in region format)
    // 4) Address (in several possible formats, e.g. city+street+building+appartment or county+city+street+house)
    // 5) Phone (again, it's great to have several formats, e.g. international or local ones)

    // console.log(`users: -----> ${users}`);

    return (
        <tbody>
    {users.map((user) => (
        <tr key={user.id + " - " + user.index}>
            <td className="px-3 text-center align-middle word-wrap-break" >{user.index}</td>
            <td className="px-3 text-left align-middle word-wrap-break">{user.id}</td>
            <td className="px-3 text-left align-middle word-wrap-break">{user.name}</td>
            <td className="px-3 text-left align-middle word-wrap-break">{user.address}</td>
            <td className="px-3 text-left align-middle word-wrap-break">{user.phone}</td>
        </tr>
    ))}
</tbody>
    );
}
