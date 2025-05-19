export const fetchServices = async (setServices: (services: any) => void, setLoading: (loading: boolean) => void, setError: (error: string) => void) => {
    try {
        const cachedServices = localStorage.getItem("services");
        if (cachedServices) {
            setServices(JSON.parse(cachedServices));
            setLoading(false);
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/`);
        if (!response.ok) {
            throw new Error("Error loading services / Error al cargar los servicios");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            setServices(data);
            localStorage.setItem("services", JSON.stringify(data));
        } else {
            console.error("The API response is not an array / La respuesta de la API no es un array:", data);
            setError("The API response is not an array / La respuesta de la API no es un array");
        }
    } catch (error) {
        console.error("Error loading services / Error al cargar los servicios:", error);
        setError("Server issues, services not available / Problemas con el servidor, servicios no disponibles");
    } finally {
        setLoading(false);
    }
};