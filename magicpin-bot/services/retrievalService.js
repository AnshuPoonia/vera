const memory = require("../storage/memoryStore");

function getMerchantContext(id) {
    return memory.merchants.get(id) || null;
}

function getCategoryContext(id) {
    return memory.categories.get(id) || null;
}

function getCustomerContext(id) {
    return memory.customers.get(id) || null;
}

function getTriggerContext(id) {
    return memory.triggers.get(id) || null;
}

module.exports = {
    getMerchantContext,
    getCategoryContext,
    getCustomerContext,
    getTriggerContext
};