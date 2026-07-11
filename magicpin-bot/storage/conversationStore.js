const STAGES = require("../services/stages");

const conversations = new Map();

function createConversation() {

    return {

        history: [],

        language: "english",

        stage: STAGES.DISCOVERY,

        lastIntent: null,

        merchantName: null,

        city: null,

        category: null,

        businessVerified: false,

        interested: false,

        autoReplyCount: 0,

        createdAt: Date.now()

    };

}

module.exports = {

    conversations,

    createConversation

};