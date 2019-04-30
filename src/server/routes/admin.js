const express = require('express');
const router = express.Router();
const getAdmins = require("../utils/getAdmins");
const deleteAdmins = require("../utils/deleteAdmin");
const sendInvite = require("../utils/email/invite/sendInvite");
const patchAdminByEmail = require("../utils/patchAdminByEmail");
const patchTaskListsById = require("../utils/patchTaskListsById");

router.get('/admin_list', getAdmins.get);

router.post("/invite", sendInvite.send);

router.delete("/delete", deleteAdmins.delete);

router.patch("/patch", patchAdminByEmail.patch);

router.patch("/taskLists",patchTaskListsById.patch);

module.exports = router;