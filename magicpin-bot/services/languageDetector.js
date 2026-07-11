const HINDI_WORDS = [
    "hai",
    "haan",
    "acha",
    "accha",
    "bhai",
    "bhaiya",
    "ji",
    "kr",
    "kar",
    "karna",
    "kaise",
    "kab",
    "kya",
    "kyu",
    "kyun",
    "mera",
    "meri",
    "mere",
    "ham",
    "hum",
    "aap",
    "business",
    "dukan",
    "shop",
    "join",
    "magicpin",
    "karna hai",
    "batao",
    "boliye",
    "please"
];

function detectLanguage(message = "") {

    const text = message.toLowerCase();

    let score = 0;

    for (const word of HINDI_WORDS) {

        if (text.includes(word))
            score++;

    }

    if (/[\u0900-\u097F]/.test(message))
        return "hindi";

    if (score >= 2)
        return "hinglish";

    return "english";

}

module.exports = {
    detectLanguage
};