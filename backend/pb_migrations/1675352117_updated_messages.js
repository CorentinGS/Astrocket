migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    collection.listRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    collection.listRule = null;

    return dao.saveCollection(collection);
  }
);
