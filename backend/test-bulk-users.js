/**
 * Script de prueba para la funcionalidad de carga masiva de usuarios
 * Asegurate de tener el servidor corriendo antes de ejecutar este script
 */

const XLSX = require("xlsx");
const path = require("path");

// Datos de ejemplo con los 6 campos requeridos en el orden exacto
const testData = [
  {
    firstName: "Ana",
    lastName: "Rodriguez",
    documentType: "CC",
    documentNumber: "1001234567",
    phone: "3151234567",
    email: "ana.rodriguez@example.com"
  },
  {
    firstName: "Carlos",
    lastName: "Martinez",
    documentType: "TI",
    documentNumber: "1098765432",
    phone: "3209876543",
    email: "carlos.martinez@example.com"
  },
  {
    firstName: "Lucia",
    lastName: "Hernandez",
    documentType: "CC",
    documentNumber: "1076543210",
    phone: "3187654321",
    email: "lucia.hernandez@example.com"
  }
];

// Crear archivo Excel de prueba
function createTestExcel() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(testData);
  
  XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
  
  const filePath = path.join(__dirname, "test-usuarios.xlsx");
  XLSX.writeFile(wb, filePath);
  
  console.log(`✅ Archivo de prueba creado: ${filePath}`);
  console.log(`📋 Contiene ${testData.length} usuarios de ejemplo`);
  console.log("📋 Campos en orden: firstName, lastName, documentType, documentNumber, phone, email");
  console.log("🔑 Las contraseñas serán los respectivos números de documento");
  
  return filePath;
}

// Función para validar la estructura del archivo
function validateExcelStructure(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    if (jsonData.length === 0) {
      console.log("❌ El archivo está vacío");
      return false;
    }
    
    const requiredColumns = ["firstName", "lastName", "documentType", "documentNumber", "phone", "email"];
    const firstRow = jsonData[0];
    const actualColumns = Object.keys(firstRow);
    
    console.log("📊 Estructura del archivo:");
    console.log("   Columnas encontradas:", actualColumns);
    console.log("   Columnas requeridas:", requiredColumns);
    
    const missingColumns = requiredColumns.filter(col => !actualColumns.includes(col));
    const extraColumns = actualColumns.filter(col => !requiredColumns.includes(col));
    
    if (missingColumns.length > 0) {
      console.log("❌ Faltan columnas:", missingColumns);
      return false;
    }
    
    if (extraColumns.length > 0) {
      console.log("⚠️  Columnas extra (se ignorarán):", extraColumns);
    }
    
    console.log(`✅ Estructura válida con ${jsonData.length} registros`);
    return true;
    
  } catch (error) {
    console.error("❌ Error validando archivo:", error.message);
    return false;
  }
}

// Ejecutar prueba
if (require.main === module) {
  console.log("🧪 Iniciando prueba de carga masiva de usuarios");
  console.log("=" .repeat(50));
  
  const testFile = createTestExcel();
  
  console.log("\n📋 Validando estructura del archivo...");
  const isValid = validateExcelStructure(testFile);
  
  if (isValid) {
    console.log("\n✅ El archivo está listo para la carga masiva");
    console.log("📝 Para probarlo:");
    console.log("   1. Asegúrate de que el servidor esté corriendo");
    console.log("   2. Haz login como ADMIN o SUPERADMIN");
    console.log("   3. Haz un POST a /api/bulk-users/upload con el archivo");
    console.log("   4. O descarga la plantilla desde /api/bulk-users/template");
  } else {
    console.log("\n❌ El archivo tiene errores en su estructura");
  }
  
  console.log("=" .repeat(50));
}

module.exports = {
  createTestExcel,
  validateExcelStructure
};
