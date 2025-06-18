const { sendWelcomeMailIfProd } = require("../services/mailService.js");

module.exports = async function sendWelcomeMail(req, res, next) {
  try {
    const user = res.locals.user;
    const plainPassword = req.body.password && req.body.password.trim() !== "" ? req.body.password : req.body.documentNumber;
    await sendWelcomeMailIfProd(user, plainPassword);
    next();
  } catch (error) {
    next(error);
  }
};
