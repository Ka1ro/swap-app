const SetModel = require('../setScema');

async function removeItemFromCollectionAuto(itemId, collectionName){
  try {
    let collection = await SetModel.findOne({collectionName: collectionName});
    let itemsInCollection = collection._doc.items;
    itemsInCollection = itemsInCollection.splice(itemsInCollection.indexOf(itemId),1);
    await collection.updateOne(collection, {
      items: itemsInCollection
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  removeItemFromCollectionAuto
}