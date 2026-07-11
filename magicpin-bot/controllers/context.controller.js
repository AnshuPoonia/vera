const crypto = require("crypto");
const contexts = require("../storage/memoryStore");

const pushContext = (req, res) => {
  try {
    const { scope, context_id, version, payload, delivered_at } = req.body;

    // -----------------------------
    // Validate Request
    // -----------------------------
    if (!scope || !context_id || version === undefined || !payload) {
      return res.status(400).json({
        accepted: false,
        reason: "invalid_request",
        details: "scope, context_id, version and payload are required.",
      });
    }

    // -----------------------------
    // Scope Mapping
    // -----------------------------

    const scopeMap = {
      category: "categories",
      merchant: "merchants",
      customer: "customers",
      trigger: "triggers",
    };

    const store = contexts[scopeMap[scope]];

    if (!store) {
      return res.status(400).json({
        accepted: false,
        reason: "invalid_scope",
      });
    }

    // -----------------------------
    // Check Existing Context
    // -----------------------------
    const current = store.get(context_id);

    // Reject older version
    if (current && current.version > version) {
      return res.status(409).json({
        accepted: false,
        reason: "stale_version",
        current_version: current.version,
      });
    }

    // Ignore duplicate version
    if (current && current.version === version) {
      return res.status(200).json({
        accepted: true,
        duplicate: true,
        ack_id: `ack_${context_id}_${version}`,
        stored_at: new Date().toISOString(),
      });
    }

    // -----------------------------
    // Store / Replace Context
    // -----------------------------
    store.set(context_id, {
      version,
      payload,
      delivered_at,
    });

    console.log(
      `[CONTEXT] ${scope.toUpperCase()} | ${context_id} | v${version}`,
    );

    return res.status(200).json({
      accepted: true,
      ack_id: crypto.randomUUID(),
      stored_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Context Error:", error);

    return res.status(500).json({
      accepted: false,
      reason: "internal_server_error",
    });
  }
};

module.exports = {
  pushContext,
};
