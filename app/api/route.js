import { fakerEN, fakerRU, fakerZH_CN } from "@faker-js/faker";
import applyErrorsToUsers from "../lib/errorGen";

const localeFakers = {
    "en": fakerEN,
    "ru": fakerRU,
    "zh_CN": fakerZH_CN,
};

// https://fakerjs.dev/api/
function getFakeUsers(amount, faker) {
    return [...new Array(amount)].map((_, index) => {
        return {
            index: index + 1,
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            address: `${faker.location.city()}, ${faker.location.streetAddress()}`,
            phone: faker.phone.number(),
        };
    });
}

export async function POST(req) {
    const { region, errors, seed, amount } = await req.json();
    
    const newFaker = localeFakers[region];

    if (!newFaker) {
        return new Response(JSON.stringify({ error: "Invalid region" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // Combine the user-provided seed with the amount (page number) to create a unique seed
    let numericSeed = parseInt(seed, 10);
    let numericAmount = parseInt(amount, 10);
    let numericErrors = parseFloat(errors);
    numericErrors = numericErrors >= 0 ? numericErrors : 0;
    numericAmount = numericAmount >= 0 ? numericAmount : 0;
    numericSeed = numericSeed >= 0 ? numericSeed : 0;
    newFaker.seed(numericSeed);

    // Generate fake users
    // console.log(`Seed inside route: -----> ${numericSeed}`);
    // console.log(`Amount inside route: -----> ${numericAmount}`);
    let fakeUsers = getFakeUsers(numericAmount, newFaker);

    // Apply errors to each user
    if(numericErrors !== 0) {
        await applyErrorsToUsers(fakeUsers, numericErrors, numericSeed, region, numericAmount)
    }
    
    // Stringify the modified users with errors
    const fakeUsersWithErrors = JSON.stringify(fakeUsers);

    const res = new Response(fakeUsersWithErrors, {
        status: 200,
        statusText: "Fake users have been generated",
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return res;
}