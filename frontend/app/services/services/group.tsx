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

export async function createGroup(groupData: any, token: string) {
    try {
        const res = await fetch(GROUPS_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(groupData),
        });
        const data = await res.json();
        if (!res.ok) {
            return { error: true, message: data.message || "Error al crear grupo", details: data.details };
        }
        return { error: false, message: data.message, group: data.group };
    } catch (error) {
        return { error: true, message: "Error al crear grupo", details: error };
    }
}

export async function updateGroup(id: number, groupData: any, token: string) {
    try {
        const res = await fetch(`${GROUPS_API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(groupData),
        });
        const data = await res.json();
        if (!res.ok) {
            return { error: true, message: data.message || "Error al actualizar grupo", details: data.details };
        }
        return { error: false, message: data.message, group: data.group };
    } catch (error) {
        return { error: true, message: "Error al actualizar grupo", details: error };
    }
}
