import { faker } from "@faker-js/faker";

export default async function applyErrorsToUsers(
    users,
    errors,
    seed,
    region,
    amount
) {
    // Define the error functions
    const errorFunctions = [deleteCharacter, addCharacter, swapCharacters];

    // Define the alphabets for different regions
    const alphabets = {
        en: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя",
        zh_CN: "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验证连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历兴属渐丰码欢益宜检疯病息功官穿纪基站巴族细影业草签博城托拉黑案致阳图飞",
    };

    // Functions for applying errors
    function deleteCharacter(str) {
        if (str.length === 0) {
            return str; // Return the original string if it's empty
        }
        const position = faker.number.int({ min: 0, max: str.length - 1 });
        return str.slice(0, position) + str.slice(position + 1);
    }

    function addCharacter(str, alphabet) {
        const position = faker.number.int({ min: 0, max: str.length });
        const alphabetArray = alphabet.split("");
        const randomIndex = faker.number.int({
            min: 0,
            max: alphabetArray.length - 1,
        });
        const newChar = alphabetArray[randomIndex];
        return str.slice(0, position) + newChar + str.slice(position);
    }

    function swapCharacters(str) {
        if (str.length <= 2 && str.length >= 0) {
            return str; // Return the original string if it's empty
        }
        if (str.length < 2) return str;
        const position = faker.number.int({ min: 0, max: str.length - 2 });
        return (
            str.slice(0, position) +
            str[position + 1] +
            str[position] +
            str.slice(position + 2)
        );
    }

    users.forEach((user, userIndex) => {
        // Set the seed for consistent randomness
        faker.seed(seed + userIndex);
        
        // console.log(`Seed inside errorGen loop: -----> ${seed}`);
        // console.log(`userIndex inside errorGen loop: -----> ${userIndex}`);
            
        // Apply errors to each field in the user data
        Object.keys(user).forEach((field) => {
            if (field === "index" || field === "id") {
                return;
            }

            let errorCount = errors;

            while (errorCount > 0) {
                let errorCountToMinus = 1; // Default to subtracting 1 for whole errors
                let applyError = true; // Always apply error if errorCount is >= 1

                if (!Number.isInteger(errorCount) && errorCount < 1) {
                    // If errorCount is a fraction less than 1, use it as the probability
                    errorCountToMinus = errorCount;
                    applyError =
                        faker.number.float({ min: 0, max: 1 }) <
                        errorCountToMinus;
                    // console.log(`applyError in case of float: ${applyError} ${errorCountToMinus}`);
                }

                if (applyError) {
                    // Select a random error function
                    const errorFunctionIndex = faker.number.int({
                        min: 0,
                        max: errorFunctions.length - 1,
                    });
                    const errorFunction = errorFunctions[errorFunctionIndex];

                    // Apply the error function to the field
                    if (errorFunction === addCharacter) {
                        user[field] = errorFunction(
                            user[field],
                            alphabets[region]
                            // Math.floor(errorCount) // Pass the whole part of errorCount
                        );
                    } else {
                        user[field] = errorFunction(user[field]);
                    }
                }

                // Decrement the error count
                errorCount -= errorCountToMinus;
            }
        });
    });

    return users;
}

// Check Equal distribution of errors between function
// function checkEqualDistribution() {
//     const errorFunctionCount = {
//         deleteCharacter: 0,
//         addCharacter: 0,
//         swapCharacters: 0,
//     };

//     for (let i = 0; i < 1000; i++) {
//         const errorFunctionIndex = faker.number.int({
//             min: 0,
//             max: errorFunctions.length - 1,
//         });

//         if (errorFunctions[errorFunctionIndex] === deleteCharacter) {
//             errorFunctionCount.deleteCharacter++;
//         } else if (errorFunctions[errorFunctionIndex] === addCharacter) {
//             errorFunctionCount.addCharacter++;
//         } else if (errorFunctions[errorFunctionIndex] === swapCharacters) {
//             errorFunctionCount.swapCharacters++;
//         }
//     }

//     console.log(errorFunctionCount);
// }
// checkEqualDistribution();
