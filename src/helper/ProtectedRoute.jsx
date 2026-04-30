import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useCallback } from "react";
import api from "../Api";
import { AUTHENTICATION_REFRESH_CREATE } from "../api-routes";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshToken = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem("REFRESH_TOKEN");
            if (!refreshToken) throw new Error("No refresh token available");

            const res = await api.post(AUTHENTICATION_REFRESH_CREATE, { refreshToken: refreshToken });
            localStorage.setItem("ACCESS_TOKEN", res.data.data.accessToken);
            setIsAuthorized(true);
        } catch (error) {
            console.error("Token refresh error:", error);
            setIsAuthorized(false);
        }
    }, []);

    useEffect(() => {
        const authenticate = async () => {
            try {
                const token = localStorage.getItem("ACCESS_TOKEN");
                if (!token) {
                    setIsAuthorized(false);
                    return;
                }

                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                const expTime = decoded.exp; // Expiration time from JWT

                // console.log("Current Time:", currentTime, `(${new Date(currentTime * 1000).toLocaleString()})`);
                //console.log("Token Expiration Time:", expTime, `(${new Date(expTime * 1000).toLocaleString()})`);
                if (token) {
                    if (expTime < currentTime) {
                        await refreshToken();
                    } else {
                        setIsAuthorized(true);
                    }
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setIsAuthorized(false);
            }
        };

        authenticate();
    }, [refreshToken]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
