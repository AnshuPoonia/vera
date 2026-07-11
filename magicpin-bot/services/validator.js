function validateReply(reply) {

    if (!reply) {

        return {
            valid: false,
            reason: "Empty response"
        };

    }

    if (reply.length < 5) {

        return {
            valid: false,
            reason: "Too short"
        };

    }

    if (reply.length > 700) {

        return {
            valid: false,
            reason: "Too long"
        };

    }

    return {
        valid: true
    };

}

module.exports = {
    validateReply
};