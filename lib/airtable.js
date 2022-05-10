var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
  if (id) {
    const findCoffeeStoreRecord = await table
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage();

    return getMinifiedRecords(findCoffeeStoreRecord);
  }
}

export { table, getMinifiedRecords, findRecordByFilter };
