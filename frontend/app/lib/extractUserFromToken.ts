const extractUserFromToken = (token: string) => {
    try {
        const base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4 !== 0) {
            base64 += "=";
        }
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
};

export default extractUserFromToken;