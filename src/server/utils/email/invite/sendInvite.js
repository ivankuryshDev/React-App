let mailjet = require ('node-mailjet')
    .connect("093c7dd4f5893e2c0600c0c781d509a2","ac9e2aa8a2a7aadcad905d06ecfe597e");
let saveInvite = require("./saveInvite");

module.exports.send = function (req, res) {

  let token = saveInvite.save(req,res);

  let options = {
    'Messages': [
      {
        'From': {
          'Email': 'development2728@gmail.com',
          'Name': 'Task Manager App'
        },
        'To': [
          {
            'Email': req.body.email
          }
        ],
        'Subject': 'Invite to Task manager App!',
        'TextPart': 'Task Manager App',
        'HTMLPart': '<h3>Task Manager App</h3>' +
            '<p>You are invited to register in the Task Manager App. ' +
            'Please confirm the registration! </p>' + 'http://' + "localhost:3000" + '/signup/'
            + token + '\n\n'
      }
    ]
  };

  let request = mailjet.post('send', {'version': 'v3.1'}).request(options);
  request
      .then(function (response, body) {
        // Render the index route on success
        if (res.headersSent) {
        } else {
          req.session.messageOnSubmit = "Перезагрузіть будь ласка сторінку!";
          return res.redirect("back");
        }
      })
      .catch(function (error) {
        if (res.headersSent) {
        } else {
          req.session.errorOnSubmit = "Неправильний пароль або паролі не співпадають!";
          res.send({errorOnSubmit: req.session.errorOnSubmit });
        }

      });
};