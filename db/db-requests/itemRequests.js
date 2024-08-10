const mongoose = require('mongoose');

const ItemModel = require('../itemScema');
const {addCollectionAuto} = require('../utils/addItemToCollectionAuto');
const {removeItemFromCollectionAuto} = require('../utils/removeItemFromCollectionAuto');


async function itemCreate(req, res){
  try {
    let itemId = await defineId(req);

    let item = new ItemModel({
      _id: itemId,
      name: req.body.name,
      collectionName: req.body.collectionName.toLowerCase(),
      price: req.body.price,
      imageUrl:req.body.imageUrl,
      users: req.body.users
    });

    const setAdded = await addCollectionAuto(itemId, req.body.collectionName.toLowerCase());
    const newSetAdded =  setAdded? "new Set added" : "no set added"; 
    
    const saved = await item.save();
    if(!saved){
      return res.status(401).json({msg: "cant save"});
    }
    res.status(200).json({msg: "success", item:{saved, newSetAdded}});
  } catch (error) {
    console.log(error);
    res.status(400).json({msg:"Unsuccessful operation"});
  }

};

async function itemUpdate(req, res){
  try {
    let itemId = req.params.id;
    let item = await ItemModel.findOneAndUpdate({
      _id: itemId
     },
     {
      name: req.body.name,
      collectionName: req.body.collectionName.toLowerCase(),
      price: req.body.price,
      imageUrl:req.body.imageUrl,
      users: req.body.users
     },
      {new: true

      });
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({msg:"Unsuccessful operation"});
  }
};

async function itemDelete(req, res){
  try {
    let itemId = req.params.id;

    let item = await ItemModel.findOne({
      _id: itemId
    });
    let itemCollection = item._doc.collectionName;

    await ItemModel.findOneAndDelete({
      _id: itemId
     });
    
    let itemDeleted = await removeItemFromCollectionAuto(itemId, itemCollection);
    if(itemDeleted){
      console.log('deleted from collection ', itemCollection);
    }
    res.status(200).json({msg: "success"});
  } catch (error) {
    console.log(error);
    res.status(400).json({msg:"Unsuccessful operation"});
  }
};

async function getAllInCollection(req, res){
  try {
    let colletionToSearch = req.params.collectionName;
    let items = await ItemModel.find({collectionName: colletionToSearch});
    if(!items){
      res.status(401).json({msg:"is empty"});
    }
    let itemsToDisplay = [];
    for(item of items){
      const {name,collectionName, price, ...otherData} = item;
      itemsToDisplay.push({name, collectionName, price});
    }
    res.json(itemsToDisplay);
  } catch (error) {
    console.log(error);
    res.status(404).json({msg:"Not found"});
  }

}

module.exports = {
  itemCreate,
  itemUpdate,
  itemDelete,
  getAllInCollection
};

async function defineId(req){
  ///add collection validation giving - between words
  /// check  what if element with id 1 is removed
  const itemInCollection = await ItemModel.find({collectionName: req.body.collectionName});
  if(itemInCollection.length!=0)
    {
      let freeId = itemInCollection.length+1;
      if(itemInCollection.length > 1)
        {
          for(let i = 1; i<=itemInCollection.length; i++)
          {
            let number = itemInCollection[i-1]._id.split('-')[1];
            number = +number;
            if(number != i)
            {
              freeId = i;
              i = itemInCollection.length + 1;
            }
          }
        };

      let finalId;
      if(freeId<10){
        finalId = `${(req.body.collectionName).toLowerCase()}-00${freeId}`;
      }else if(freeId<100){
        finalId = `${(req.body.collectionName).toLowerCase()}-0${freeId}`;
      }else{
        finalID = `${(req.body.collectionName).toLowerCase()}-${freeId}`;
      }
       return finalId;
    }
  else{
    return `${req.body.collectionName}-001`;
  } 
};