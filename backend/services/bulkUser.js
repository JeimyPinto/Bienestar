const XLSX = require("xlsx");
const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const { sendWelcomeMail } = require("./mail");
const { createAuditLog } = require("./auditLog");

/**
 * Procesa un archivo Excel (buffer) y crea usuarios masivamente.
 * Devuelve un array de resultados por fila.
 */
async function processExcelFile(buffer, creatorId = null) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const results = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const result = { row: i + 2, data: row, status: "", error: null };
    try {
      // Validaciones básicas
      if (!row.firstName || !row.lastName || !row.documentType || !row.documentNumber || !row.phone || !row.email) {
        result.status = "error";
        result.error = "Faltan campos obligatorios";
        results.push(result);
        continue;
      }
      // Verificar duplicados por email
      const existsEmail = await User.findOne({ where: { email: row.email } });
      if (existsEmail) {
        result.status = "duplicado";
        result.error = "Email ya registrado";
        results.push(result);
        continue;
      }
      // Verificar duplicados por documento
      const existsDoc = await User.findOne({ where: { documentNumber: row.documentNumber.toString() } });
      if (existsDoc) {
        result.status = "duplicado";
        result.error = "Documento ya registrado";
        results.push(result);
        continue;
      }
      // Crear usuario
      const password = row.documentNumber.toString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName: row.firstName,
        lastName: row.lastName,
        documentType: row.documentType,
        documentNumber: row.documentNumber.toString(),
        phone: row.phone,
        email: row.email,
        password: hashedPassword,
        status: "activo",
        role: "user",
        createdBy: creatorId
      });
      // Auditoría de creación
      await createAuditLog({
        entity_type: "User",
        entity_id: user.id,
        action: "CREATE",
        old_data: null,
        new_data: user.toJSON(),
        changed_by: creatorId
      });
      // Enviar correo de bienvenida
      await sendWelcomeMail(user, password);
      result.status = "creado";
      result.userId = user.id;
      results.push(result);
    } catch (err) {
      result.status = "error";
      result.error = err.message;
      results.push(result);
    }
  }
  return results;
}

/**
 * Genera un reporte resumen de la carga masiva
 */
function generateReport(results) {
  const total = results.length;
  const creados = results.filter(r => r.status === "creado").length;
  const duplicados = results.filter(r => r.status === "duplicado").length;
  const errores = results.filter(r => r.status === "error").length;
  return {
    total,
    creados,
    duplicados,
    errores,
    detalles: results
  };
}

module.exports = {
  processExcelFile,
  generateReport
};
