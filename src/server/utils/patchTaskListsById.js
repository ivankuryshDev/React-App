const Admin = require("../model/admin");

module.exports.patch = function (req,res) {

//   if (req.body.password!==req.body.confirmPassword){
//     return res.send("passwords doesn't coincidence")
//   }

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
