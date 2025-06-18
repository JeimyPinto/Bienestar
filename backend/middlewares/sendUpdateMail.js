const { sendUpdateMailIfProd } = require("../services/mailService.js");

module.exports = async function sendUpdateMail(req, res, next) {
  try {
    const user = res.locals.user;
    await sendUpdateMailIfProd(user);
    next();
  } catch (error) {
    next(error);
  }
};
