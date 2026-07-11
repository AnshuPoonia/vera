const templates = require("./categoryTemplates");

function buildReplyPrompt({

    merchant,

    category,

    customer,

    trigger,

    history,

    message

}) {

    const categoryInfo =
        merchant?.category_slug
            ? templates[merchant.category_slug] || ""
            : "";

    return `

You are an AI onboarding assistant for magicpin.

RULES

- Never hallucinate.

- Never mention information not provided.

- Be friendly.

- Keep replies below 80 words.

- Ask only ONE question.

- Personalize using merchant data.

- Use category knowledge.

- Continue the conversation naturally.

------------------------------------

Merchant

${JSON.stringify(merchant, null, 2)}

------------------------------------

Category

${JSON.stringify(category, null, 2)}

------------------------------------

Customer

${JSON.stringify(customer, null, 2)}

------------------------------------

Trigger

${JSON.stringify(trigger, null, 2)}

------------------------------------

Category Guidance

${categoryInfo}

------------------------------------

Conversation

${history.map(h => `${h.from}: ${h.message}`).join("\n")}

------------------------------------

Merchant Message

${message}

Reply only with the assistant message.

`;

}

module.exports = {
    buildReplyPrompt
};