const SetModel = require('../setScema');

async function addCollectionRequest(req, res){
  try {
    let set = new SetModel({
      collectionName: req.body.collectionName,
      items: req.body.items,
    })

    let saved = await set.save();

    if(!saved){
      res.status(401).json({msg: "cannto save"});
    }

    res.json(saved);

  } catch (error) {
    console.log(error);
    res.status(404).json({msg:"invalid operation"});
  }
};

async function addItemToCollection(req, res){
  try {
    let set = await SetModel.findOne({
      collectionName: req.body.collectionName});
    set._doc.items.push(...req.body.items);

    let saved = await set.save();
    if(!saved){
      res.status(401).json({msg:"cant save"});
    }
    res.json(saved);
  } catch (error) {
    console.log(error);
    res.status(404).json({msg:'invalid operation'});
  }
};

async function removeItemFromCollection(req, res){
  try {
    let set = await SetModel.findOne({
      collectionName: new String(req.body.collectionName).toLowerCase()
    });
    const index = set._doc.items.indexOf(req.body.item);

    if(index){
      if(index>-1){
        set._doc.items.splice(index, 1);
      }
      else{
        set._doc.items.pop();
      }
      let saved = await set.save();
      
      return res.json(saved)
      
    }else{
      return res.status(404).json({msg:"not found"})
    }    
  } catch (error) {
    console.log(error);
    res.status(404).json({msg:'invalid operation'});
  }
}

module.exports = {
  addCollectionRequest,
  addItemToCollection,
  removeItemFromCollection,
}