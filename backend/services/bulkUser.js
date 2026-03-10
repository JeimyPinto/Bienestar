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
  
  // Buscar la hoja de datos por nombre o usar la segunda si existe
  const sheetName = workbook.SheetNames.includes("Carga_Usuarios") 
    ? "Carga_Usuarios" 
    : workbook.SheetNames[0]; // Fallback al primero por si suben un archivo sin el nombre esperado
    
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const results = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    // Mapeo selectivo de nombres en español a campos del modelo
    const userData = {
      firstName: row["Nombres"],
      lastName: row["Apellidos"],
      documentType: row["Tipo de Documento"],
      documentNumber: row["Número de Documento"]?.toString(),
      phone: row["Teléfono"]?.toString(),
      email: row["Correo Electrónico"]
    };

    const result = { row: i + 2, data: userData, status: "", error: null };
    
    try {
      // Validaciones básicas con los nuevos nombres
      if (!userData.firstName || !userData.lastName || !userData.documentType || !userData.documentNumber || !userData.email) {
        result.status = "error";
        result.error = "Faltan campos obligatorios (Nombres, Apellidos, Documento, Email)";
        results.push(result);
        continue;
      }
      
      // Verificar duplicados por email
      const existsEmail = await User.findOne({ where: { email: userData.email } });
      if (existsEmail) {
        result.status = "duplicado";
        result.error = "Email ya registrado";
        results.push(result);
        continue;
      }
      
      // Verificar duplicados por documento
      const existsDoc = await User.findOne({ where: { documentNumber: userData.documentNumber } });
      if (existsDoc) {
        result.status = "duplicado";
        result.error = "Número de documento ya registrado";
        results.push(result);
        continue;
      }

      // Crear usuario
      const password = userData.documentNumber;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        ...userData,
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
