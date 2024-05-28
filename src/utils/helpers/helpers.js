import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export function checkJWTToken() {
    const cookies = Cookies.get('token');
    if (cookies) {
        return true;
    } else {
        return false;
    }
}
export function isTokenExpired(token) {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}