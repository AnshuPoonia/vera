const STAGES = require("./stages");
const { INTENTS } = require("./intentDetector");

function updateConversation(conversation, intent) {

    if (!conversation.stage) {
        conversation.stage = STAGES.DISCOVERY;
    }

    switch (conversation.stage) {

        //--------------------------------------------------
        // DISCOVERY
        //--------------------------------------------------

        case STAGES.DISCOVERY:

            if (intent === INTENTS.JOIN_MAGICPIN) {

                conversation.stage = STAGES.INTEREST;

            }

            break;

        //--------------------------------------------------
        // INTEREST
        //--------------------------------------------------

        case STAGES.INTEREST:

            if (
                intent === INTENTS.PROVIDE_DETAILS ||
                intent === INTENTS.ASK_VERIFICATION
            ) {

                conversation.stage = STAGES.QUALIFICATION;

            }

            break;

        //--------------------------------------------------
        // QUALIFICATION
        //--------------------------------------------------

        case STAGES.QUALIFICATION:

            if (intent === INTENTS.PROVIDE_DETAILS) {

                conversation.stage = STAGES.VERIFY_DETAILS;

            }

            break;

        //--------------------------------------------------
        // VERIFY DETAILS
        //--------------------------------------------------

        case STAGES.VERIFY_DETAILS:

            if (intent === INTENTS.JOIN_MAGICPIN) {

                conversation.stage = STAGES.ONBOARDING;

            }

            break;

        //--------------------------------------------------
        // ONBOARDING
        //--------------------------------------------------

        case STAGES.ONBOARDING:

            if (intent === INTENTS.THANKS) {

                conversation.stage = STAGES.ACTIVATED;

            }

            break;

        //--------------------------------------------------
        // HOSTILE
        //--------------------------------------------------

        if (intent === INTENTS.HOSTILE) {

            conversation.stage = STAGES.ENDED;

        }

    }

    conversation.lastIntent = intent;

    return conversation;

}

module.exports = {
    updateConversation
};