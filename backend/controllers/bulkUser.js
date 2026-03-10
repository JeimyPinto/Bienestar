const bulkUserService = require("../services/bulkUser");
const chalk = require("chalk");
const XLSX = require("xlsx");

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


      // Generar reporte y adaptarlo a la estructura esperada por el frontend
      const rawReport = bulkUserService.generateReport(results);

      // Adaptar nombres y estructura
      const summary = {
        total: rawReport.total ?? 0,
        created: rawReport.creados ?? 0,
        duplicates: rawReport.duplicados ?? 0,
        errors: rawReport.errores ?? 0,
        successRate: rawReport.total && rawReport.creados !== undefined
          ? `${((rawReport.creados / rawReport.total) * 100).toFixed(1)}%`
          : "0%"
      };
      // Separar detalles por tipo
      const details = {
        successful: (rawReport.detalles || []).filter(r => r.status === "creado").map(r => ({
          row: r.row,
          userId: r.userId,
          email: r.data?.email,
          password: r.data?.documentNumber
        })),
        duplicates: (rawReport.detalles || []).filter(r => r.status === "duplicado").map(r => ({
          row: r.row,
          email: r.data?.email,
          documentNumber: r.data?.documentNumber
        })),
        errors: (rawReport.detalles || []).filter(r => r.status === "error").map(r => ({
          row: r.row,
          error: r.error,
          data: r.data
        }))
      };

      const report = { summary, details };

      console.log(chalk.green("✅ Carga masiva completada"));

      res.status(200).json({
        error: false,
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
      // Crear solo los encabezados - nombres descriptivos en español
      const headers = [
        "Nombres",
        "Apellidos", 
        "Tipo de Documento",
        "Número de Documento",
        "Teléfono",
        "Correo Electrónico"
      ];

      // Crear workbook
      const wb = XLSX.utils.book_new();

      // --- Hoja 1: Instrucciones ---
      const instructionsData = [
        ["IMPORTANTE: INSTRUCCIONES PARA LA CARGA MASIVA"],
        [""],
        ["1. No elimine ni modifique la primera fila (los encabezados) de la hoja 'Carga_Usuarios'."],
        ["2. Los encabezados son esenciales para el funcionamiento correcto de la plantilla."],
        ["3. Llene los datos a partir de la segunda fila."],
        ["4. El formato de documento debe ser texto o número sin puntos ni guiones."],
        ["5. Asegúrese de que el correo electrónico tenga un formato válido."],
        [""],
        ["CAMPOS OBLIGATORIOS:"],
        ["- Nombres"],
        ["- Apellidos"],
        ["- Tipo de Documento (CC, CE, PA, TI, etc.)"],
        ["- Número de Documento"],
        ["- Teléfono"],
        ["- Correo Electrónico"]
      ];
      const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
      wsInstructions["!cols"] = [{ wch: 80 }]; // Ancho para instrucciones
      XLSX.utils.book_append_sheet(wb, wsInstructions, "INSTRUCCIONES");

      // --- Hoja 2: Plantilla de Usuarios ---
      const ws = XLSX.utils.aoa_to_sheet([headers]);

      // Configurar el ancho de las columnas para mejor visualización
      const columnWidths = [
        { wch: 15 }, // Nombres
        { wch: 15 }, // Apellidos
        { wch: 20 }, // Tipo de Documento
        { wch: 20 }, // Número de Documento
        { wch: 15 }, // Teléfono
        { wch: 30 }  // Correo Electrónico
      ];
      ws["!cols"] = columnWidths;

      // Añadir la hoja al workbook
      XLSX.utils.book_append_sheet(wb, ws, "Carga_Usuarios");

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
