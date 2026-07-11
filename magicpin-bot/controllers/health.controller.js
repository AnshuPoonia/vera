const memoryStore = require("../storage/memoryStore");

const startTime = Date.now();

const healthCheck = (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime_seconds: Math.floor((Date.now() - startTime) / 1000),
        contexts_loaded: {
            category: memoryStore.categories.size,
            merchant: memoryStore.merchants.size,
            customer: memoryStore.customers.size,
            trigger: memoryStore.triggers.size
        }
    });
};

module.exports = {
    healthCheck
};