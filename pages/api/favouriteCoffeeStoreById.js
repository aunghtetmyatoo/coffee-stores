import {
    table,
    findRecordByFilter,
    getMinifiedRecords,
} from "../../lib/airtable";

const favoriteCoffeeStoreById = async (req, res) => {
    if (req.method === "PUT") {
        const { id } = req.body;

        try {
            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0) {
                    const record = records[0];

                    const calculateVoting = parseInt(record.voting) + 1;

                    const updateRecord = await table.update([
                        {
                            id: record.recordId,
                            fields: {
                                voting: calculateVoting,
                            },
                        },
                    ]);

                    if (updateRecord) {
                        const minifiedRecords = getMinifiedRecords(updateRecord);
                        res.json(minifiedRecords);
                    }
                } else {
                    res.json({ message: "Coffee store id doesn't exist", id });
                }
            } else {
                res.status(400);
                res.json({ message: "Id is missing" });
            }
        } catch (error) {
            console.error("Something went wrong", error);
            res.json({ message: "Something went wrong", error });
        }
    }
}

export default favoriteCoffeeStoreById;