const path = require("path");
const fs = require("fs");

function getUploadPath({ entity, originalname }) {
  let baseDir = path.join(__dirname, "../uploads/images");
  let subDir = entity === "user" ? "users" : entity === "service" ? "services" : entity;
  let dir = path.join(baseDir, subDir);
  fs.mkdirSync(dir, { recursive: true });
  const ext = originalname ? path.extname(originalname) : "";
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `file-${uniqueSuffix}${ext}`;
  const fullPath = path.join(dir, filename);
  return { dir, filename, fullPath };
}

module.exports = { getUploadPath };
