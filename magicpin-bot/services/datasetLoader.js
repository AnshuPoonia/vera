const fs = require("fs");
const path = require("path");

const memoryStore = require("../storage/memoryStore");

function loadFolder(folderPath, map) {
  if (!fs.existsSync(folderPath)) return;

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const fullPath = path.join(folderPath, file);

    const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));

    const id =
      data.context_id ||
      data.merchant_id ||
      data.customer_id ||
      data.id ||
      path.parse(file).name;
      

    map.set(id, data);
  }
}

function loadDatasets() {
  const base = path.join(__dirname, "..", "dataset", "expanded");

  loadFolder(path.join(base, "categories"), memoryStore.categories);

  loadFolder(path.join(base, "merchants"), memoryStore.merchants);
  

  loadFolder(path.join(base, "customers"), memoryStore.customers);

  loadFolder(path.join(base, "triggers"), memoryStore.triggers);

  console.log("Datasets Loaded");

  console.log("Categories :", memoryStore.categories.size);

  console.log("Merchants :", memoryStore.merchants.size);

  console.log("Customers :", memoryStore.customers.size);

  console.log("Triggers :", memoryStore.triggers.size);
}

module.exports = loadDatasets;
