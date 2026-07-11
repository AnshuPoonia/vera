const REQUIRED_FIELDS = ["business_name", "owner_name", "city", "category"];

function buildMerchantProfile(merchant) {
  if (!merchant) {
    return {
      business_name: null,
      owner_name: null,
      city: null,
      category: null,
    };
  }

  const identity = merchant.identity || {};

  return {
    business_name: identity.name || null,
    owner_name: identity.owner_first_name || null,
    city: identity.city || null,
    category: merchant.category_slug || null,
  };
}

function getMissingFields(profile) {
  return REQUIRED_FIELDS.filter((field) => !profile[field]);
}

function nextQuestion(profile) {
  const missing = getMissingFields(profile);

  console.log("Qualification Profile:");
  console.log(profile);

  console.log("Missing Fields:");
  console.log(missing);

  if (!missing.length) return null;

  switch (missing[0]) {
    case "business_name":
      return "What is your business name?";

    case "owner_name":
      return "May I know the owner's name?";

    case "city":
      return "Which city is your business located in?";

    case "category":
      return "Which category does your business belong to?";

    default:
      return null;
  }
}

module.exports = {
  buildMerchantProfile,
  getMissingFields,
  nextQuestion,
};
