migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "lgh8j9zg",
        name: "author",
        type: "relation",
        required: true,
        unique: false,
        options: {
          collectionId: "_pb_users_auth_",
          cascadeDelete: false,
          maxSelect: 1,
          displayFields: ["id", "avatar", "name"],
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    // remove
    collection.schema.removeField("lgh8j9zg");

    return dao.saveCollection(collection);
  }
);
