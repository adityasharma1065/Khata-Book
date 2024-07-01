var hisaabModel = require("../models/hisaab-model");
var userModel = require("../models/user-model");

module.exports.createhisaabController = async (req, res) => {
  try {
    let { description, title, encrypted, shareable, passcode, editpermission } =
      req.body;

    encrypted = encrypted == "on" ? true : false;
    shareable = shareable == "on" ? true : false;
    editpermission = editpermission == "on" ? true : false;

    // console.log(encrypted, shareable, editpermission);

    var hisabdata = await hisaabModel.create({
      description,
      title,
      encrypted,
      shareable,
      passcode,
      editpermission,
      user: req.user._id,
    });

    var user = await userModel.findOne({ email: req.user.email });
    user.hisaabID.push(hisabdata._id);
    await user.save();
    res.redirect("/profile");
  } catch (err) {
    // res.send(err.message);
    req.flash("error",err.message)
      return res.redirect("/profile")
  }
};


module.exports.createpageController = (req, res) => {
    const errorMessage = req.flash('error');
  res.render("create",{errorMessage});
};

module.exports.viewhisabController=async (req,res)=>{
    var hisaab=await hisaabModel.findOne({_id:req.params.id})
    
    if(hisaab.encrypted){
        const errorMessage = req.flash('error');
        res.render("passcode",{hisaab,errorMessage})
    }
    else{
        res.render("hisaab",{hisaab})
    }
}

module.exports.hisaabverifyController=async(req,res)=>{
    var passcode=req.body.passcode
    var hisaab=await hisaabModel.findOne({_id:req.params.id})
    if(passcode==hisaab.passcode){
        res.render("hisaab",{hisaab})
    }
    else{
        req.flash("error","Invalid Credentials")
      return res.redirect("back")
    }
}

module.exports.deletehisaabController=async (req,res)=>{
    await hisaabModel.deleteOne({ _id: req.params.id });
    res.redirect("/profile")
}

module.exports.editController=async (req,res)=>{
    var hisaab=await hisaabModel.findOne({_id:req.params.id})
    res.render("edit",{hisaab})
}

module.exports.saveeditedController=async(req,res)=>{
    var hisaab=await hisaabModel.findOne({_id:req.params.id})
    hisaab.description = req.body.description;
    hisaab.title = req.body.title;
    hisaab.encrypted = req.body.encrypted == "on"; 
    hisaab.sharable = req.body.sharable == "on";
    hisaab.passcode = req.body.passcode;
    hisaab.editpermission = req.body.editpermission == "on";
    await hisaab.save();
    res.redirect(`/hisaab/view/${hisaab._id}`)
}