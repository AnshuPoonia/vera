const INTENTS = require("./intents");

const rules = [
  {
    intent: INTENTS.JOIN_MAGICPIN,
    score: 5,
    patterns: [
      "join magicpin",
      "register",
      "register my business",
      "list my business",
      "list business",
      "add my business",
      "start onboarding",
      "onboarding",
      "interested",
      "yes please",
      "lets do it",
      "let's do it",
      "ok lets do it",
      "ok let's do it",
      "what's next",
      "whats next",
      "proceed",
      "continue",
      "sign me up",
      "start"
    ]
  },

  {
    intent: INTENTS.ASK_BENEFITS,
    score: 4,
    patterns: [
      "benefits",
      "advantages",
      "why magicpin",
      "why should i join",
      "how does it help",
      "what do i get",
      "grow business",
      "increase sales",
      "more customers"
    ]
  },

  {
    intent: INTENTS.ASK_PRICING,
    score: 4,
    patterns: [
      "pricing",
      "price",
      "cost",
      "charges",
      "subscription",
      "fee",
      "fees",
      "payment"
    ]
  },

  {
    intent: INTENTS.ASK_COMMISSION,
    score: 4,
    patterns: [
      "commission",
      "percentage",
      "cut",
      "margin",
      "how much commission"
    ]
  },

  {
    intent: INTENTS.ASK_OFFERS,
    score: 3,
    patterns: [
      "offer",
      "offers",
      "discount",
      "promotion",
      "deal",
      "coupon"
    ]
  },

  {
    intent: INTENTS.ASK_VERIFICATION,
    score: 3,
    patterns: [
      "verify",
      "verification",
      "documents",
      "kyc",
      "gst",
      "license"
    ]
  },

  {
    intent: INTENTS.ASK_SUPPORT,
    score: 3,
    patterns: [
      "help",
      "support",
      "issue",
      "problem",
      "not working",
      "customer care"
    ]
  },

  {
    intent: INTENTS.GREETING,
    score: 2,
    patterns: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good evening",
      "namaste"
    ]
  },

  {
    intent: INTENTS.THANKS,
    score: 2,
    patterns: [
      "thanks",
      "thank you",
      "great",
      "awesome"
    ]
  },

  {
    intent: INTENTS.GOODBYE,
    score: 2,
    patterns: [
      "bye",
      "goodbye",
      "see you",
      "take care"
    ]
  },

  {
    intent: INTENTS.HOSTILE,
    score: 100,
    patterns: [
      "spam",
      "stop messaging",
      "leave me alone",
      "don't message",
      "dont message",
      "idiot",
      "useless",
      "scam"
    ]
  }
];

function detectIntent(message = "") {

  const text = message.toLowerCase().trim();

  let bestIntent = INTENTS.GENERAL;

  let highestScore = 0;

  for (const rule of rules) {

    let score = 0;

    for (const pattern of rule.patterns) {

      if (text.includes(pattern)) {

        score += rule.score;

      }

    }

    if (score > highestScore) {

      highestScore = score;

      bestIntent = rule.intent;

    }

  }

  return bestIntent;

}

module.exports = {
  detectIntent,
  INTENTS
};