const merchants = new Map();

function getMerchantState(id) {

    if (!merchants.has(id)) {

        merchants.set(id, {

            businessName: null,

            city: null,

            language: "english",

            interested: false,

            verified: false,

            completed: false,

            lastIntent: null,

            lastQuestion: null

        });

    }

    return merchants.get(id);

}

module.exports = {

    getMerchantState

};