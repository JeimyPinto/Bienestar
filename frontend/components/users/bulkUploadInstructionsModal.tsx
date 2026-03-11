import React from "react";
import { ClipboardList, X, Rocket, FileText, User, Users, CreditCard, Hash, Smartphone, Mail, AlertTriangle, Download, Check, CheckCircle2, XCircle } from "lucide-react";

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
                className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-transparent border-none"
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-azul-cielo/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    {/* Header del modal */}
                    <div className="bg-gradient-to-r from-primary to-azul-cielo p-6 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <ClipboardList className="mr-3" size={28} />
                                Instrucciones para Carga Masiva
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-azul-cielo bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all duration-300"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Contenido del modal */}
                    <div className="p-6 space-y-6">
                        {/* Pasos generales */}
                        <div>
                            <h3 className="text-xl font-bold text-azul-oscuro mb-4 flex items-center">
                                <Rocket className="mr-2 text-primary" size={24} />
                                Pasos para realizar la carga masiva
                            </h3>
                            <ol className="space-y-4 text-azul-marino/80">
                                <li className="flex items-start">
                                    <span className="bg-primary text-white min-w-[24px] h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                                    <span>Descarga la plantilla Excel haciendo clic en <strong>Descargar Plantilla</strong></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-white min-w-[24px] h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                                    <span>Completa los datos siguiendo las instrucciones de cada campo</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-white min-w-[24px] h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                                    <span>Guarda el archivo y súbelo usando <strong>Subir Archivo Excel</strong></span>
                                </li>
                            </ol>
                        </div>

                        {/* Campos requeridos */}
                        <div>
                            <h3 className="text-xl font-bold text-azul-oscuro mb-4 flex items-center">
                                <FileText className="mr-2 text-primary" size={24} />
                                Campos requeridos y formato
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Nombres */}
                                <div className="bg-verde-claro/10 p-4 rounded-xl border border-success/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <User className="mr-2 text-success" size={18} />
                                        Nombres
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Primer y segundo nombre del usuario</p>
                                    <div className="bg-white p-3 rounded-lg border border-success/20 text-sm space-y-2">
                                        <div className="flex items-center gap-2 text-success font-bold">
                                            <CheckCircle2 size={16} /> <span>Correcto:</span> <span className="text-azul-marino font-normal">Juan Carlos</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-danger font-bold">
                                            <XCircle size={16} /> <span>Incorrecto:</span> <span className="text-azul-marino font-normal">(vacío)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Apellidos */}
                                <div className="bg-verde-claro/10 p-4 rounded-xl border border-success/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <Users className="mr-2 text-success" size={18} />
                                        Apellidos
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Primer y segundo apellido del usuario</p>
                                    <div className="bg-white p-3 rounded-lg border border-success/20 text-sm space-y-2">
                                        <div className="flex items-center gap-2 text-success font-bold">
                                            <CheckCircle2 size={16} /> <span>Correcto:</span> <span className="text-azul-marino font-normal">García López</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-danger font-bold">
                                            <XCircle size={16} /> <span>Incorrecto:</span> <span className="text-azul-marino font-normal">(vacío)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tipo de documento */}
                                <div className="bg-warning/10 p-4 rounded-xl border border-warning/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <CreditCard className="mr-2 text-warning" size={18} />
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
                                        <Hash className="mr-2 text-danger" size={18} />
                                        Número de Documento
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Solo números, sin puntos, espacios ni guiones</p>
                                    <div className="bg-white p-3 rounded-lg border border-danger/20 text-sm space-y-2">
                                        <div className="flex items-center gap-2 text-success font-bold">
                                            <CheckCircle2 size={16} /> <span>Correcto:</span> <span className="text-azul-marino font-normal">12345678</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-danger font-bold">
                                            <XCircle size={16} /> <span>Incorrecto:</span> <span className="text-azul-marino font-normal">12.345.678 o 12 345 678</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Teléfono */}
                                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <Smartphone className="mr-2 text-primary" size={18} />
                                        Teléfono
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Número de teléfono sin espacios</p>
                                    <div className="bg-white p-3 rounded-lg border border-primary/20 text-sm space-y-2">
                                        <div className="flex items-center gap-2 text-success font-bold">
                                            <CheckCircle2 size={16} /> <span>Correcto:</span> <span className="text-azul-marino font-normal">3001234567</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-danger font-bold">
                                            <XCircle size={16} /> <span>Incorrecto:</span> <span className="text-azul-marino font-normal">300 123 4567</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bg-azul-cielo/10 p-4 rounded-xl border border-azul-cielo/20">
                                    <h4 className="font-bold text-azul-oscuro mb-2 flex items-center">
                                        <Mail className="mr-2 text-primary" size={18} />
                                        Correo Electrónico
                                    </h4>
                                    <p className="text-sm text-azul-marino/70 mb-2">Dirección de email válida</p>
                                    <div className="bg-white p-3 rounded-lg border border-azul-cielo/20 text-sm space-y-2">
                                        <div className="flex items-center gap-2 text-success font-bold">
                                            <CheckCircle2 size={16} /> <span>Correcto:</span> <span className="text-azul-marino font-normal">juan@ejemplo.com</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-danger font-bold">
                                            <XCircle size={16} /> <span>Incorrecto:</span> <span className="text-azul-marino font-normal">juan@ejemplo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información sobre correos de bienvenida */}
                        <div>
                            <h3 className="text-xl font-bold text-azul-oscuro mb-4 flex items-center">
                                <Mail className="mr-2 text-primary" size={24} />
                                Correos de bienvenida
                            </h3>
                            <div className="bg-azul-cielo/10 p-4 rounded-xl border border-azul-cielo/20">
                                <p className="text-azul-marino/80 mb-3">
                                    Al realizar la carga masiva, el sistema enviará automáticamente correos de bienvenida a cada usuario creado.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start">
                                        <span className="text-success mr-2 mt-1">
                                            <Check size={14} />
                                        </span>
                                        <span>Cada usuario recibirá sus credenciales de acceso por correo</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-success mr-2 mt-1">
                                            <Check size={14} />
                                        </span>
                                        <span>La contraseña será su número de documento (sin espacios ni puntos)</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-success mr-2 mt-1">
                                            <Check size={14} />
                                        </span>
                                        <span>El usuario se reportará como creado aunque el correo no se envíe</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notas importantes */}
                        <div className="bg-gradient-to-r from-warning/10 to-danger/10 p-4 rounded-xl border border-warning/30">
                            <h3 className="text-xl font-bold text-azul-oscuro mb-3 flex items-center">
                                <AlertTriangle className="mr-2 text-warning" size={24} />
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
                                <Download size={20} />
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
                                <Check size={20} />
                                <span>Entendido</span>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
