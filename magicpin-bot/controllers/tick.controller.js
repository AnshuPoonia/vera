const contexts = require("../storage/memoryStore");

const { askLLM } = require("../services/ollama.service");

const { buildMerchantPrompt } = require("../services/prompt.service");

async function tick(req, res) {

    try {

        const actions = [];

        for (const triggerId of req.body.available_triggers) {

            const trigger = contexts.trigger.get(triggerId);

            if (!trigger)
                continue;

            const merchant = contexts.merchant.get(
                trigger.payload.merchant_id
            );

            if (!merchant)
                continue;

            const category = contexts.category.get(
                merchant.payload.category_slug
            );

            if (!category)
                continue;

            const body = await askLLM(

                buildMerchantPrompt(

                    category.payload,

                    merchant.payload,

                    trigger.payload

                )

            );

            actions.push({

                conversation_id: crypto.randomUUID(),

                merchant_id: merchant.payload.merchant_id,

                customer_id: null,

                send_as: "vera",

                trigger_id: triggerId,

                template_name: "vera_dynamic",

                template_params: [],

                body,

                cta: "open_ended",

                suppression_key: trigger.payload.suppression_key || "",

                rationale: "Generated using category, merchant and trigger contexts."

            });

        }

        res.json({

            actions

        });

    }

    catch (err) {

        console.log(err);

        res.json({

            actions: []

        });

    }

}

module.exports = {
    tick
};