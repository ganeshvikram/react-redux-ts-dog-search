import { Navigate } from "react-router";




export const ProtuctedRoutes = ({children}) => {
    const token = sessionStorage.getItem('token');

    function isTokenExpired(token) {
        if (!token) return true;
      
        try {
          const [, payloadBase64] = token.split(".");
          if (!payloadBase64) return true;
      
          // Convert Base64URL to Base64
          const payload = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
          const { exp } = JSON.parse(payload);
      
          if (!exp) return true;
      
          const now = Math.floor(Date.now() / 1000); // current time in seconds
          return now >= exp; // true = expired
        } catch (err) {
          console.error("Invalid token:", err);
          return true; // treat invalid tokens as expired
        }
    }

  return isTokenExpired(token) ? <Navigate to="/login" />: children
}
