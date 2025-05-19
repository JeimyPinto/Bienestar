export const fetchUserServices = async (token: string) => {
    try {
        if (!token) {
            throw new Error("No token found / No se encontró el token");
        }
        const user = JSON.parse(atob(token.split(".")[1]));
        const userId = user.id;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/id/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error(
                "Error loading services / Error al cargar los servicios"
            );
        }
        const data = await response.json();
        const { services, message } = data;
        return { services, message };
    } catch (error) {
        console.error(
            "Error loading services / Error al cargar los servicios:",
            error
        );
        throw error;
    }
};
