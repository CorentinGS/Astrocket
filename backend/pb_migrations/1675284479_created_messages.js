migrate(
  (db) => {
    const collection = new Collection({
      id: "0w764ktlshfmz7q",
      created: "2023-02-01 20:47:59.850Z",
      updated: "2023-02-01 20:47:59.850Z",
      name: "messages",
      type: "base",
      system: false,
      schema: [
        {
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
        },
      ],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    return dao.deleteCollection(collection);
  }
);
