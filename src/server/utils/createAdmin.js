const Admin = require("../model/admin");
const User = require("../model/user");
const Invitation = require("../model/invitation");

module.exports.post = function (req, res) {

  if (req.body.password !== req.body.confirmPassword) {
    req.session.errorOnSubmit = "Паролі не співпадають!";
              res.redirect("back");
  } else {
    Invitation.findOne({ email: req.body.email }, function (error, invitation) {

      if (error) {
        res.send(error);
      } else if (req.params.token !== invitation.invitationToken
        || invitation.invitationExpires < Date.now()
        || invitation.email !== req.body.email) {
          req.session.errorOnSubmit = "Вийшов строк дії токена або він некоректний!";
              res.redirect("back");
      } else {
        if (invitation.role === "admin") {
          let admin = new Admin({
            email: req.body.email,
            password: req.body.password,
            secondEmail: req.body.secondEmail,
            name: req.body.name,
            role: "admin",
            taskLists: []
          });

          admin.save((error) => {
            if (error) {
              req.session.errorOnSubmit = "Неправильний пароль (пароль має мати від 6 до 50 символів!), або паролі не співпадають!";
              res.redirect("back");
            } else {
              Invitation.findOneAndUpdate({ email: req.body.email },
                { $set: { invitationToken: null, invitationExpires: null } }, (error) => {
                  if (error) {
                    req.session.errorOnSubmit = "Неправильний пароль (пароль має мати від 6 до 50 символів!), або паролі не співпадають!";;
                    res.redirect("back");
                  } else {
                    req.session.messageOnSubmit = "Користувач успішно створений!";
                    res.redirect("back");
                  }
                });
            }
          });

        } else {
          let user = new User({
            email: req.body.email,
            password: req.body.password,
            secondEmail: req.body.secondEmail,
            name: req.body.name,
            role: "user",
            taskLists: []
          });

          user.save((error) => {
            if (error) {
              req.session.errorOnSubmit = "Пароль має мати від 6 до 50 символів!";
              res.redirect("back");
            } else {
              Invitation.findOneAndUpdate({ email: req.body.email },
                { $set: { invitationToken: null, invitationExpires: null } }, (error) => {
                  if (error) {
                    req.session.errorOnSubmit = "Неправильний пароль (пароль має мати від 6 до 50 символів!), або паролі не співпадають!";;
                    res.redirect("back");
                  } else {
                    res.redirect("/login");
                  }
                });
            }
          });
        }
      }
    });
  }
};

module.exports.get = function (req, res) {
  let sliced = req.headers.referer.slice(-40);
  Invitation.findOne({
    invitationToken: sliced,
    invitationExpires: { $gt: Date.now() }
  }, function (err, invitation) {
    if (!invitation) {
      req.session.error = "Недійсний токен, або вийшов строк дії!";
      res.send({ error: req.session.error });
    } else {
      res.send({
        message: "here you can create an account " + invitation.email,
        email: invitation.email, errorOnSubmit: req.session.errorOnSubmit,
        messageOnSubmit: req.session.messageOnSubmit
      });
      req.session.destroy();
    }
  });
};