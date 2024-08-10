const SetModel = require('../setScema');

async function addCollectionAuto(itemId, collectionName){
  try {
    let  modelExists = await SetModel.findOne(
      {
      collectionName: collectionName
    });
    if(!modelExists){
      let set = new SetModel({
        collectionName: collectionName,
        items: [itemId],
      })

      let saved = await set.save();
      if(!saved){
        return false;
      }
      return true;
    }
    else {
      let itemsInSet = modelExists._doc.items; 
      itemsInSet.push(itemId);
      let itemAdded = await modelExists.updateOne(modelExists, {
        items: itemsInSet
      });
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  addCollectionAuto
}