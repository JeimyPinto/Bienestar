
import { useEffect, useState } from "react"
import { ServiceFormProps, Service } from "../types/service"
import { create, update } from "../services/services/service"

const emptyService: Service = {
    id: 0,
    name: "",
    description: "",
    creatorId: 0,
    area: {} as Area,
    image: "",
    status: "" as ServiceStatus,
    createdAt: "",
    updatedAt: "",
};

export default function ServiceForm(props: ServiceFormProps) {
    const { dialogRef, closeDialog, onClose, mode, serviceToEdit } = props;
    const [token, setToken] = useState<string | null>(null);
    const [newService, setNewService] = useState<Service>(emptyService);

    // Obtener token y usuario autenticado
    useEffect(() => {
        let tokenValue: string | null = null;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
            tokenValue = localStorage.getItem("token");
        } else {
            const cookie = document.cookie;
            tokenValue =
                cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1] || null;
        }
        setToken(tokenValue);
    }, []);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && serviceToEdit) {
            setNewService(serviceToEdit);
        } else if (mode === "create") {
            setNewService(emptyService);
        }
    }, [mode, serviceToEdit]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setNewService((prevService) => ({
                ...prevService,
                profileImage: e.target.files![0],
            }));
        }
    }
}