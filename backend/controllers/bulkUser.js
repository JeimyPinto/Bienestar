const bulkUserService = require("../services/bulkUser");
const chalk = require("chalk");

const BulkUserController = {
  /**
   * Procesa un archivo Excel para crear usuarios masivamente
   */
  async bulkCreate(req, res, next) {
    try {
      console.log(chalk.blue("📋 Iniciando carga masiva de usuarios"));

      // Verificar que se subió un archivo
      if (!req.file) {
        const error = new Error("No se proporcionó archivo Excel");
        error.status = 400;
        throw error;
      }

      // Verificar que es un archivo Excel
      const allowedMimes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      
      if (!allowedMimes.includes(req.file.mimetype)) {
        const error = new Error("El archivo debe ser un Excel (.xls o .xlsx)");
        error.status = 400;
        throw error;
      }

      // Procesar el archivo
      const results = await bulkUserService.processExcelFile(
        req.file.buffer,
        req.user?.id || null
      );

      // Generar reporte
      const report = bulkUserService.generateReport(results);

      console.log(chalk.green("✅ Carga masiva completada"));

      res.status(200).json({
        message: "Carga masiva de usuarios completada",
        report
      });

    } catch (error) {
      console.error(chalk.red("💥 Error en carga masiva:"), chalk.yellow(error.message));
      next(error);
    }
  },

  /**
   * Descarga una plantilla Excel con el formato correcto
   */
  async downloadTemplate(req, res, next) {
    try {
      const XLSX = require("xlsx");
      
      // Crear solo los encabezados - nombres técnicos en inglés
      const headers = [
        "firstName",
        "lastName", 
        "documentType",
        "documentNumber",
        "phone",
        "email"
      ];

      // Crear workbook con solo una fila de encabezados
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([headers]);

      // Configurar el ancho de las columnas para mejor visualización
      const columnWidths = [
        { wch: 15 }, // firstName
        { wch: 15 }, // lastName
        { wch: 15 }, // documentType
        { wch: 18 }, // documentNumber
        { wch: 15 }, // phone
        { wch: 25 }  // email
      ];
      ws["!cols"] = columnWidths;

      // Añadir la hoja al workbook
      XLSX.utils.book_append_sheet(wb, ws, "Plantilla_Usuarios");

      // Generar buffer
      const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

      // Configurar headers para descarga
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=plantilla_usuarios.xlsx");

      console.log(chalk.green("📥 Plantilla Excel descargada"));

      res.send(buffer);

    } catch (error) {
      console.error(chalk.red("💥 Error generando plantilla:"), chalk.yellow(error.message));
      next(error);
    }
  }
};

module.exports = BulkUserController;
