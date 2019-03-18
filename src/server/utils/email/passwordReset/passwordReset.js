let generateToken = require("./generatePasswordResetLink");
let mailjet = require ('node-mailjet')
    .connect("093c7dd4f5893e2c0600c0c781d509a2","ac9e2aa8a2a7aadcad905d06ecfe597e");

module.exports.send = function (req, res, next) {
  let options = {
    'Messages': [
      {
        'From': {
          'Email': 'development2728@gmail.com',
          'Name': 'Recruiter App'
        },
        'To': [
          {
            'Email': req.body.email
          }
        ],
        'Subject': 'Reset password',
        'TextPart': 'Recruiter App',
        'HTMLPart': '<h3>Recruiter App</h3>' +
            '<p>You can reset password by going throught link below </p>'
            + 'http://' + "localhost:3000" + '/reset/' + generateToken.generate(req,res) + '\n\n'
      }
    ]
  };

  let request = mailjet.post('send', {'version': 'v3.1'}).request(options);
  request
      .then(function () {
        req.session.resetPasswordMessage = `Запит на відновлення паролю успішно надіслано на ${req.body.email}, перевірте вашу пошту`
        return res.redirect("back");
      })
      .catch(function (err) {
      });
};

module.exports.get = function(req,res){
if(req.session.resetPasswordMessage){
  res.send({
    "message": req.session.resetPasswordMessage});
    req.session.destroy();
} else {
  res.send({ "error": req.session.resetPasswordError});
  req.session.destroy();
}
}