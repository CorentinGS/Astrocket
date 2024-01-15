migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "3xsnsq4b",
        name: "content",
        type: "text",
        required: true,
        unique: false,
        options: {
          min: null,
          max: 200,
          pattern: "",
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "3xsnsq4b",
        name: "messages",
        type: "text",
        required: true,
        unique: false,
        options: {
          min: null,
          max: 100,
          pattern: "",
        },
      })
    );

    return dao.saveCollection(collection);
  }
);
