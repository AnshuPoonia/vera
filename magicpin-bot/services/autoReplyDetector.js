const autoReplyStore = new Map();

const patterns = [
    "thank you",
    "thanks for contacting",
    "thank you for contacting us",
    "thank you for your response",
    "automatic reply",
    "auto reply",
    "away message",
    "our representative",
    "our team",
    "respond shortly",
    "we will get back",
    "your message is important",
    "business account"
];

function isAutoReply(message = "") {

    const lower = message.toLowerCase();

    return patterns.some(p => lower.includes(p));

}

function recordAutoReply(merchantId) {

    const count = (autoReplyStore.get(merchantId) || 0) + 1;

    autoReplyStore.set(merchantId, count);

    return count;

}

function clearAutoReply(merchantId) {

    autoReplyStore.delete(merchantId);

}

module.exports = {
    isAutoReply,
    recordAutoReply,
    clearAutoReply
};