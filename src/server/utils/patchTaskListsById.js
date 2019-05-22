const Admin = require("../model/admin");

module.exports.patch = function (req,res) {

  let updatedOptions = {
    taskLists : req.body.taskLists
  };

  Admin.findOneAndUpdate({email: req.body.email}, {$set: updatedOptions}, function(error){
    if(error){
      res.send(error);
    } else {
      res.redirect('back')
    }
  });

};
