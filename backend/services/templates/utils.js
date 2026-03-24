const developmentWarningBlock = require("../constants/developmentWarning.js");

const getDevWarning = (isDevelopment) => {
  return isDevelopment ? developmentWarningBlock : "";
};

module.exports = { getDevWarning };

