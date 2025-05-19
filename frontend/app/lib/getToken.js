export function getToken({ setToken, setError, setLoading }) {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
        setError(
            "Authorization token not found / No se ha encontrado el token de autorización"
        );
        setLoading(false);
    } else {
        setToken(storedToken);
    }
}
