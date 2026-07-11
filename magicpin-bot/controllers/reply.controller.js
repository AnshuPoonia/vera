const { conversations } = require("../storage/conversationStore");
console.log(conversations);
console.log(typeof conversations);
console.log(conversations instanceof Map);
const {
  getMerchantContext,
  getCategoryContext,
  getCustomerContext,
  getTriggerContext,
} = require("../services/retrievalService");

const { buildReplyPrompt } = require("../services/prompt.service");
const { generateReply } = require("../services/replyGenerator");

const { detectIntent } = require("../services/intentDetector");

const { detectLanguage } = require("../services/languageDetector");

const { updateConversation } = require("../services/conversationPlanner");
const {
  isAutoReply,
  recordAutoReply,
  clearAutoReply,
} = require("../services/autoReplyDetector");
const {
  buildMerchantProfile,
  getMissingFields,
  nextQuestion,
} = require("../services/qualification.service");
const { getMerchantState } = require("../storage/merchantState");

const reply = async (req, res) => {
  try {
    const {
      conversation_id,
      merchant_id,
      customer_id,
      trigger_id,
      from_role,
      message,
    } = req.body;
    console.log(req.body);
    //-------------------------------------------------
    // Conversation Memory
    //-------------------------------------------------

    if (!conversations.has(conversation_id)) {
      const { createConversation } = require("../storage/conversationStore");

      conversations.set(conversation_id, createConversation());
    }

    const conversation = conversations.get(conversation_id);

    conversation.history.push({
      from: from_role,
      message,
    });

    const intent = detectIntent(message);

    conversation.language = detectLanguage(message);

    updateConversation(conversation, intent);

    console.log("Stage :", conversation.stage);

    console.log("Intent :", intent);

    //-------------------------------------------------
    // Hostile Detection

    //-------------------------------------------------

    if (intent === "HOSTILE") {
      return res.json({
        action: "end",

        rationale: "Merchant requested to stop.",
      });
    }

    //-------------------------------------------------
    // Auto Reply Detection
    //-------------------------------------------------

    if (isAutoReply(message)) {
      const count = recordAutoReply(merchant_id);

      console.log("Merchant :", merchant_id);
      console.log("Auto reply count :", count);

      if (count >= 3) {
        clearAutoReply(merchant_id);

        return res.json({
          action: "end",
          rationale: "Repeated WhatsApp auto replies detected.",
        });
      }

      return res.json({
        action: "wait",
        wait_seconds: 1800,
        rationale: "Detected WhatsApp auto reply.",
      });
    } else {
      clearAutoReply(merchant_id);
    }

    const merchantContext = merchant_id
      ? getMerchantContext(merchant_id)
      : null;

    const merchant = merchantContext?.payload ?? null;
    console.log("merchantContext:");
    console.log(merchantContext);

    console.log("merchant:");
    console.log(merchant);
    if (merchant) {
      conversation.businessName = merchant?.identity?.name;

      conversation.category = merchant?.category_slug;
    }
    const category =
      merchant && merchant.category_slug
        ? getCategoryContext(merchant.category_slug)
        : null;

    const customer = customer_id ? getCustomerContext(customer_id) : null;

    const trigger = trigger_id ? getTriggerContext(trigger_id) : null;

    //-------------------------------------------------
    // Merchant Committed
    //-------------------------------------------------

    if (intent === "JOIN_MAGICPIN") {
      console.log("Merchant Context:");
      console.dir(merchant, { depth: null });
      const profile = buildMerchantProfile(merchant);
      const missing = getMissingFields(profile);

      if (missing.length) {
        return res.json({
          action: "send",

          body: nextQuestion(profile),

          cta: "reply",

          rationale: "Collecting merchant onboarding information.",
        });
      }

      return res.json({
        action: "send",

        body: `Perfect! 🎉

I've started your magicpin onboarding.

Business:
• ${merchant.identity.name}
• ${merchant.identity.city}

The next step is verification.

Please share your GST number (or reply "No GST" if your business doesn't have one).`,

        cta: "reply",

        rationale: "Merchant committed. Started onboarding.",
      });
    }

    //-------------------------------------------------
    // Retrieve Context
    //-------------------------------------------------

    //-------------------------------------------------
    // Build Prompt
    //-------------------------------------------------

    const prompt = buildReplyPrompt({
      merchant,
      category,
      customer,
      trigger,
      history: conversation.history,
      message,
    });

    //-------------------------------------------------
    // Ask Ollama
    //-------------------------------------------------
    console.log("========== NEW REQUEST ==========");
    console.log(req.body);

    console.log("1. Conversation OK");

    console.log("2. Intent:", intent);

    console.log("3. Auto reply checked");

    console.log("4. Loading context");

    console.log("5. Building prompt");

    console.log("6. Calling LLM");
    const aiReply = await generateReply(prompt);
    console.log("7. LLM Finished");
    //-------------------------------------------------
    // Return AI Response
    //-------------------------------------------------

    return res.json({
      action: "send",
      body: aiReply,
      cta: "open_ended",
      rationale: "Generated using merchant, category and conversation context.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      action: "end",
      rationale: "Internal server error.",
    });
  }
};

module.exports = {
  reply,
};
