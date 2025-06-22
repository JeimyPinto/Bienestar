const GROUPS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/groups`;

export async function getAllGroups(token?: string) {
    try {
        const res = await fetch(GROUPS_API_URL, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (!res.ok) {
            return { error: true, message: data.message || "Error al obtener grupos", details: data.details };
        }
        return { error: false, message: data.message, groups: data.groups || data.data || [] };
    } catch (error) {
        return { error: true, message: "Error al obtener grupos", details: error };
    }
}
