const UserModel = require('../userScema');
const ItemModel = require('../itemScema');

async function addItemToUserRequest(req, res){
  try {
    let set = await UserModel.findOne({
      _id: req.body.userId});
    set._doc.items.push(...req.body.items); ///add option using parameters or setting as function par

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

async function addItemToUserAuto(req){
  try {
    
  } catch (error) {
    console.log(error);
    return false;
  }
}