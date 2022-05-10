import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method == "POST") {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          const createRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                neighbourhood,
                voting,
                imgUrl,
              },
            },
          ]);

          const records = createRecords.map((record) => {
            return {
              ...record.fields,
            };
          });
          res.json({ message: "create record", records });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      res.status(500);
      res.json({ message: "Something went wrong!", err });
    }
  } else {
    res.json({ message: "method is GET" });
  }
};

export default createCoffeeStore;
