const UserModel = require('../userScema');

async function removeItemFromUserRequest(req, res){
  try {
    let set = await UserModel.findOne({
        _id: req.body.userId
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