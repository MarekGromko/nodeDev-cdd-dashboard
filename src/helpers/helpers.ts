import { jwtDecode } from "jwt-decode";

export const unwrapTimeframe = (timeframe: string) => {
    const end = new Date();
    let start = new Date();
    switch (timeframe) {
        case "week":
            start.setDate(end.getDate() - 7);
            break;
        case "month":
            start.setMonth(end.getMonth() - 1);
            break;
        case "halfyear":
        case "months":
            start.setMonth(end.getMonth() - 6);
            break;
        case "year":
            start.setFullYear(end.getFullYear() - 1);
            break;
    }
    return [ start, end ] as const;
}

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if(!token) return false;
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const now = Date.now() / 1000;
        if(!decoded.exp || decoded.exp < now) {
            localStorage.removeItem('token');
            return false;
        }
    } catch {
        return false;
    }
    return true;
}

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}
