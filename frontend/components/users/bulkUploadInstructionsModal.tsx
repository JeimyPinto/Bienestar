import React from "react";

interface BulkUploadInstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownloadTemplate: () => void;
}

export default function BulkUploadInstructionsModal({ 
    isOpen, 
    onClose, 
    onDownloadTemplate 
}: BulkUploadInstructionsModalProps) {
    if (!isOpen) return null;

    const handleDownloadAndClose = () => {
        onClose();
        onDownloadTemplate();
    };

    return (
        <>
            <div className="fixed inset-0 bg-azul-marino/60 backdrop-blur-md z-[90] transition-all duration-300"></div>
            <dialog 
                open 
                className="fixed inset-0 z-[95] flex items-center justify-center p-4"
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-azul-cielo/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    {/* Header del modal */}
                    <div className="bg-gradient-to-r from-primary to-azul-cielo p-6 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <span className="mr-3">📋</span>
                                Instrucciones para Carga Masiva
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-azul-cielo bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all duration-300"
                            >
                                <span className="text-xl">✕</span>
                            </button>
                        </div>
                    </div>

                    {/* Contenido del modal */}
                    <div className="p-6 space-y-6">
                        {/* Pasos generales */}
                        <div>
                            <h3 className="text-xl font-bold text-azul-oscuro mb-4 flex items-center">
                                <span className="mr-2">🚀</span>
                                Pasos para realizar la carga masiva
                            </h3>
                            <ol className="space-y-2 text-azul-marino/80">
                                <li className="flex items-start">
                                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                                    <span>Descarga la plantilla Excel haciendo clic en <strong>Descargar Plantilla</strong></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                                    <span>Completa los datos siguiendo las instrucciones de cada campo</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                                    <span>Guarda el archivo y súbelo usando <strong>Subir Archivo Excel</strong></span>
                                </li>
                            </ol>
                        </div>

                        {/* Campos requeridos */}
                        <div>
                            <h3 className="text-xl font-bold text-azul-oscuro mb-4 flex items-center">
                                <span className="mr-2">📝</span>
                                Campos requeridos y formato
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Nombres */}
                                <div className="bg-verde-claro/10 p-4 rounded-xl border border-success/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <span className="mr-2">👤</span>
                                        Nombres
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Primer y segundo nombre del usuario</p>
                                    <div className="bg-white p-2 rounded border text-sm">
                                        <strong>✅ Correcto:</strong> Juan Carlos<br/>
                                        <strong>❌ Incorrecto:</strong> (vacío)
                                    </div>
                                </div>

                                {/* Apellidos */}
                                <div className="bg-verde-claro/10 p-4 rounded-xl border border-success/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <span className="mr-2">👥</span>
                                        Apellidos
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Primer y segundo apellido del usuario</p>
                                    <div className="bg-white p-2 rounded border text-sm">
                                        <strong>✅ Correcto:</strong> García López<br/>
                                        <strong>❌ Incorrecto:</strong> (vacío)
                                    </div>
                                </div>

                                {/* Tipo de documento */}
                                <div className="bg-warning/10 p-4 rounded-xl border border-warning/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <span className="mr-2">📄</span>
                                        Tipo de Documento
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Solo se permiten estos códigos:</p>
                                    <div className="bg-white p-2 rounded border text-sm space-y-1">
                                        <div><strong>CC</strong> - Cédula de Ciudadanía</div>
                                        <div><strong>CE</strong> - Cédula de Extranjería</div>
                                        <div><strong>PA</strong> - Pasaporte</div>
                                        <div><strong>RC</strong> - Registro Civil</div>
                                        <div><strong>TI</strong> - Tarjeta de Identidad</div>
                                        <div><strong>PEP</strong> - Permiso Especial de Permanencia</div>
                                    </div>
                                </div>

                                {/* Número de documento */}
                                <div className="bg-danger/10 p-4 rounded-xl border border-danger/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <span className="mr-2">🔢</span>
                                        Número de Documento
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Solo números, sin puntos, espacios ni guiones</p>
                                    <div className="bg-white p-2 rounded border text-sm">
                                        <strong>✅ Correcto:</strong> 12345678<br/>
                                        <strong>❌ Incorrecto:</strong> 12.345.678 o 12 345 678
                                    </div>
                                </div>

                                {/* Teléfono */}
                                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <span className="mr-2">📱</span>
                                        Teléfono
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Número de teléfono sin espacios</p>
                                    <div className="bg-white p-2 rounded border text-sm">
                                        <strong>✅ Correcto:</strong> 3001234567<br/>
                                        <strong>❌ Incorrecto:</strong> 300 123 4567
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bg-azul-cielo/10 p-4 rounded-xl border border-azul-cielo/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <span className="mr-2">📧</span>
                                        Correo Electrónico
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Dirección de email válida</p>
                                    <div className="bg-white p-2 rounded border text-sm">
                                        <strong>✅ Correcto:</strong> juan@ejemplo.com<br/>
                                        <strong>❌ Incorrecto:</strong> juan@ejemplo
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información sobre correos de bienvenida */}
                        <div>
                            <h3 className="text-xl font-bold text-azul-oscuro mb-4 flex items-center">
                                <span className="mr-2">📧</span>
                                Correos de bienvenida
                            </h3>
                            <div className="bg-azul-cielo/10 p-4 rounded-xl border border-azul-cielo/20">
                                <p className="text-azul-marino/80 mb-3">
                                    Al realizar la carga masiva, el sistema enviará automáticamente correos de bienvenida a cada usuario creado.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start">
                                        <span className="text-success mr-2 mt-1">✓</span>
                                        <span>Cada usuario recibirá sus credenciales de acceso por correo</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-success mr-2 mt-1">✓</span>
                                        <span>La contraseña será su número de documento (sin espacios ni puntos)</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-success mr-2 mt-1">✓</span>
                                        <span>El usuario se reportará como creado aunque el correo no se envíe</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notas importantes */}
                        <div className="bg-gradient-to-r from-warning/10 to-danger/10 p-4 rounded-xl border border-warning/30">
                            <h3 className="text-xl font-bold text-azul-oscuro mb-3 flex items-center">
                                <span className="mr-2">⚠️</span>
                                Notas importantes
                            </h3>
                            <ul className="space-y-2 text-azul-marino/80">
                                <li className="flex items-start">
                                    <span className="text-warning mr-2 mt-1">•</span>
                                    <span>El <strong>número de documento</strong> será usado como contraseña temporal</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-warning mr-2 mt-1">•</span>
                                    <span>Los <strong>emails y documentos</strong> deben ser únicos (no duplicados)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-warning mr-2 mt-1">•</span>
                                    <span>Todos los usuarios creados tendrán rol <strong>APRENDIZ</strong> por defecto</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-warning mr-2 mt-1">•</span>
                                    <span>Revisa el reporte después de la carga para ver errores o duplicados</span>
                                </li>
                            </ul>
                        </div>

                        {/* Botones del modal */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={handleDownloadAndClose}
                                className="
                                    bg-primary hover:bg-azul-cielo text-white 
                                    px-6 py-3 rounded-xl font-semibold transition-all duration-300
                                    hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                                    border border-primary/30
                                "
                            >
                                <span>📥</span>
                                <span>Descargar Plantilla</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="
                                    bg-azul-marino hover:bg-azul-oscuro text-white 
                                    px-6 py-3 rounded-xl font-semibold transition-all duration-300
                                    hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                                    border border-azul-marino/30
                                "
                            >
                                <span>✓</span>
                                <span>Entendido</span>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
