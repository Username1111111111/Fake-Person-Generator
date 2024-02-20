"use client";
import { useState, useEffect, useRef } from "react";
import TableHead from "./tableHead";
import TableRows from "./tableRows";
import Header from "./header";
// import { faker } from "@faker-js/faker";
import { CSVLink } from "react-csv";
import InfiniteScroll from "react-infinite-scroll-component";

const generateUsers = async ({ region, errors, seed, amount }) => {
    const requestBody = {
        region,
        errors,
        seed,
        amount,
    };

    const req = new Request(`https://faker-magic.onrender.com/api/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    const res = await fetch(req);
    const users = await res.json();
    return users;
};

const Table = () => {
    const initAmount = 20;
    const [region, setRegion] = useState("en");
    const [errors, setErrors] = useState(0);
    const [seed, setSeed] = useState(0);
    // const [seed, setSeed] = useState(faker.number.int({ max: 1000000 }));
    const [users, setUsers] = useState([]);
    const [amount, setAmount] = useState(initAmount);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await generateUsers({
                region,
                errors,
                seed,
                amount,
            });
            // console.log(`Seed inside useEffect: -----> ${seed}`);
            // console.log(`Amount inside useEffect: -----> ${amount}`);
            setUsers(fetchedUsers);
        };

        fetchUsers();
    }, [region, errors, seed, amount]);

    // ---------------------- Infinite scroll

    const fetchMoreData = async () => {
        // Increment the amount to fetch the next batch
        const newAmount = amount + 10;
        setAmount(newAmount);

        const fetchedUsers = await generateUsers({
            region,
            errors,
            seed: seed + newAmount,
            amount: newAmount,
        });

        // console.log(`Seed inside fetchMoreData: -----> ${seed}`);
        // console.log(`Amount inside fetchMoreData: -----> ${amount}`);

        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers.slice(amount)]);

        setHasMore(fetchedUsers.length > amount);
    };

    // ---------------------- CSV Export

    const headers = [
        { label: "#", key: "index" },
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Address", key: "address" },
        { label: "Phone", key: "phone" },
    ];

    const csvReport = {
        data: users,
        headers: headers,
        filename: "users.csv",
    };

    const csvLink = useRef();

    const exportCSV = () => {
        csvLink.current.link.click();
    };

    return (
        <>
            <Header
                region={region}
                setRegion={setRegion}
                errors={errors}
                setErrors={setErrors}
                seed={seed}
                setSeed={setSeed}
                exportCSV={exportCSV}
            ></Header>
            <div className="container-fluid w-100">
                <InfiniteScroll
                    dataLength={users.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <h4 className="text-center">
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                        </h4>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>You have seen all records</b>
                        </p>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    <table className="table w-100 table-striped table-bordered container-fluid">
                        <TableHead></TableHead>
                        <TableRows users={users}></TableRows>
                    </table>
                </InfiniteScroll>
            </div>
            <CSVLink {...csvReport} className="hidden" ref={csvLink}></CSVLink>
        </>
    );
};

export default Table;
