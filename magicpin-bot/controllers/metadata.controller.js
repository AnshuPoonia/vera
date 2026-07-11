const getMetadata = (req, res) => {

    res.status(200).json({
        bot_name: "Magicpin AI Bot",
        team_name: process.env.TEAM_NAME || "Team Anshu",
        version: "1.0.0",
        model: process.env.MODEL || "llama3",
        capabilities: [
            "conversation",
            "engagement",
            "intent_detection",
            "hostile_handling"
        ]
    });

};

module.exports = {
    getMetadata
};
