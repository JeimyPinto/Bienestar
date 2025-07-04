const XLSX = require("xlsx");
const { User } = require("../models");
const { Op } = require("sequelize");
const { createAuditLog } = require("../services/auditLog");
const { sendWelcomeMailIfProd } = require("../services/mail");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

class BulkUserService {
  /**
   * Procesa un archivo Excel y crea usuarios masivamente
   * @param {Buffer} fileBuffer - Buffer del archivo Excel
   * @param {number} createdBy - ID del usuario que ejecuta la carga
   * @returns {Object} Resultado del procesamiento
   */
  async processExcelFile(fileBuffer, createdBy = null) {
    try {
      // Leer el archivo Excel
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convertir a JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      console.log(chalk.blue("📊 Procesando archivo Excel con"), chalk.cyan(`${jsonData.length} registros`));
      
      const results = {
        total: jsonData.length,
        created: 0,
        errors: [],
        duplicates: [],
        successful: []
      };
      
      // Validar estructura del Excel - solo los campos requeridos
      const requiredColumns = ["firstName", "lastName", "documentType", "documentNumber", "phone", "email"];
      const firstRow = jsonData[0] || {};
      const missingColumns = requiredColumns.filter(col => !(col in firstRow));
      
      if (missingColumns.length > 0) {
        throw new Error(`Faltan columnas requeridas: ${missingColumns.join(", ")}. El orden debe ser: firstName, lastName, documentType, documentNumber, phone, email`);
      }
      
      // Procesar cada fila
      for (let i = 0; i < jsonData.length; i++) {
        const rowData = jsonData[i];
        const rowNumber = i + 2; // +2 porque Excel inicia en 1 y hay header
        
        try {
          // Validar datos requeridos
          const validationResult = this.validateRowData(rowData);
          if (!validationResult.isValid) {
            results.errors.push({
              row: rowNumber,
              error: validationResult.errors.join(", "),
              data: rowData
            });
            continue;
          }
          
          // Verificar si el usuario ya existe
          const existingUser = await User.findOne({
            where: {
              [Op.or]: [
                { email: rowData.email },
                { documentNumber: rowData.documentNumber }
              ]
            }
          });
          
          if (existingUser) {
            results.duplicates.push({
              row: rowNumber,
              email: rowData.email,
              documentNumber: rowData.documentNumber
            });
            continue;
          }
          
          // Generar contraseña usando documentNumber
          const hashedPassword = await bcrypt.hash(rowData.documentNumber.toString().trim(), 10);
          
          // Crear usuario con valores por defecto
          const userData = {
            firstName: rowData.firstName?.trim(),
            lastName: rowData.lastName?.trim(),
            documentType: rowData.documentType?.trim().toUpperCase() || "CC",
            documentNumber: rowData.documentNumber?.toString().trim(),
            phone: rowData.phone?.toString().trim(),
            email: rowData.email?.trim().toLowerCase(),
            password: hashedPassword,
            role: "USER", // Siempre USER
            status: "activo", // Siempre activo
            groupId: null // Siempre null
          };
          
          const newUser = await User.create(userData);
          
          // Enviar correo de bienvenida automáticamente
          const plainPassword = rowData.documentNumber.toString().trim();
          try {
            await sendWelcomeMailIfProd(newUser, plainPassword);
            console.log(chalk.blue(`📧 Correo de bienvenida enviado a: ${newUser.email}`));
          } catch (mailError) {
            console.warn(chalk.yellow(`⚠️ Usuario creado pero correo no enviado para: ${newUser.email} - ${mailError.message}`));
          }
          
          // Crear log de auditoría
          await createAuditLog({
            entity_type: "User",
            entity_id: newUser.id,
            action: "CREATE_BULK",
            old_data: null,
            new_data: { ...newUser.toJSON(), password: "[HIDDEN]" },
            changed_by: createdBy,
            description: `Usuario creado mediante carga masiva, fila ${rowNumber}`
          });
          
          results.created++;
          results.successful.push({
            row: rowNumber,
            userId: newUser.id,
            email: newUser.email,
            password: rowData.documentNumber.toString().trim() // Contraseña = documentNumber
          });
          
          console.log(chalk.green(`✅ Usuario creado: ${newUser.email} (fila ${rowNumber})`));
          
        } catch (error) {
          results.errors.push({
            row: rowNumber,
            error: error.message,
            data: rowData
          });
          console.error(chalk.red(`❌ Error en fila ${rowNumber}:`), chalk.yellow(error.message));
        }
      }
      
      console.log(chalk.blue("📊 Resumen de carga masiva:"));
      console.log(chalk.green(`✅ Creados: ${results.created}`));
      console.log(chalk.yellow(`⚠️ Duplicados: ${results.duplicates.length}`));
      console.log(chalk.red(`❌ Errores: ${results.errors.length}`));
      
      return results;
      
    } catch (error) {
      console.error(chalk.red("💥 Error procesando archivo Excel:"), chalk.yellow(error.message));
      throw error;
    }
  }
  
  /**
   * Valida los datos de una fila
   */
  validateRowData(rowData) {
    const errors = [];
    
    // Validaciones requeridas - los 6 campos obligatorios
    if (!rowData.firstName?.trim()) {
      errors.push("firstName es requerido");
    }
    if (!rowData.lastName?.trim()) {
      errors.push("lastName es requerido");
    }
    if (!rowData.documentType?.trim()) {
      errors.push("documentType es requerido");
    }
    if (!rowData.documentNumber?.toString().trim()) {
      errors.push("documentNumber es requerido");
    }
    if (!rowData.phone?.toString().trim()) {
      errors.push("phone es requerido");
    }
    if (!rowData.email?.trim()) {
      errors.push("email es requerido");
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (rowData.email && !emailRegex.test(rowData.email.trim())) {
      errors.push("formato de email inválido");
    }
    
    // Validar tipos de documento válidos
    const validDocTypes = ["CC", "CE", "PA", "RC", "TI", "PEP"];
    if (rowData.documentType && !validDocTypes.includes(rowData.documentType.trim().toUpperCase())) {
      errors.push("documentType debe ser: CC, CE, PA, RC, TI o PEP");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Genera un reporte detallado de los resultados
   */
  generateReport(results) {
    const report = {
      summary: {
        total: results.total,
        created: results.created,
        duplicates: results.duplicates.length,
        errors: results.errors.length,
        successRate: `${((results.created / results.total) * 100).toFixed(2)}%`
      },
      details: {
        successful: results.successful,
        duplicates: results.duplicates,
        errors: results.errors
      }
    };
    
    return report;
  }
}

module.exports = new BulkUserService();
