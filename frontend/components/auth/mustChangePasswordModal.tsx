"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { changePassword } from "../../services/auth";
import { useAuthContext } from "../../contexts/authContext";
import { tokenManager } from "../../lib/tokenManager";

export default function MustChangePasswordModal() {
    const { user, token, setAuth } = useAuthContext();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!user?.mustChangePassword) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (newPassword.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            const result = await changePassword(newPassword, token || "");
            if (result.error) {
                setError(result.message);
            } else {
                // Actualizar sesión local
                const updatedUser = { ...user, mustChangePassword: false };
                tokenManager.saveSession(token || "", updatedUser);
                setAuth(token, updatedUser);
            }
        } catch (err) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-azul-oscuro/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl border border-azul-cielo/20 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-azul-oscuro to-azul-marino p-6 text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-outfit">Cambio Obligatorio</h2>
                    <p className="text-azul-cielo/80 text-sm mt-1">
                        Por seguridad, debes actualizar tu contraseña inicial.
                    </p>
                </div>

                {/* Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-azul-oscuro mb-1">
                                Nueva Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border-2 border-azul-cielo/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                />
                                <Lock className="absolute left-3 top-3.5 text-azul-marino/40" size={18} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-azul-marino/40 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-azul-oscuro mb-1">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border-2 border-azul-cielo/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                                    placeholder="Repite tu contraseña"
                                    required
                                />
                                <CheckCircle2 className="absolute left-3 top-3.5 text-azul-marino/40" size={18} />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-danger/10 text-danger text-sm rounded-lg border border-danger/20">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-primary to-azul-marino text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Actualizar Contraseña"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer info */}
                <div className="bg-azul-cielo/5 p-4 border-t border-azul-cielo/10 text-center">
                    <p className="text-xs text-azul-marino/60">
                        Una vez actualizada, podrás acceder a todas las funciones del portal.
                    </p>
                </div>
            </div>
        </div>
    );
}
