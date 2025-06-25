const GROUPS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/groups`;

type GroupData = Record<string, unknown>;

export async function getAll(token?: string) {
    try {
        const res = await fetch(GROUPS_API_URL, {
            credentials: "include",
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

export async function create(groupData: GroupData, token: string) {
    try {
        const res = await fetch(GROUPS_API_URL, {
            method: "POST",
            credentials: "include",
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

export async function update(id: number, groupData: GroupData, token: string) {
    try {
        const res = await fetch(`${GROUPS_API_URL}/${id}`, {
            method: "PUT",
            credentials: "include",
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
