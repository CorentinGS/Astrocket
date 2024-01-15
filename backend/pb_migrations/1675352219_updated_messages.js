migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    collection.viewRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0w764ktlshfmz7q");

    collection.viewRule = null;

    return dao.saveCollection(collection);
  }
);
