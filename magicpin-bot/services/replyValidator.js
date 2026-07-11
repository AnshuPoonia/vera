function validateReply(reply = "") {

    if (!reply)
        return "I'd be happy to help you join magicpin. Could you tell me your business name?";

    reply = reply.replace(/\*/g, "");

    reply = reply.replace(/\n{3,}/g, "\n\n");

    reply = reply.trim();

    if (reply.length > 350)
        reply = reply.substring(0, 350);

    return reply;

}

module.exports = {
    validateReply
};