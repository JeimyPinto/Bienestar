const mailService = require("../services/mail.js");

const authenticateToken = require("../middlewares/authenticateToken.js");

const sendNotification = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Faltan campos requeridos: to, subject, html" });
    }
      await mailService.sendGenericMail({ to, subject, html });
      res.json({ success: true, message: "Email sent successfully" });
    });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({ error: "Fallo enviando email" });
  }
};

module.exports = { sendNotification };
