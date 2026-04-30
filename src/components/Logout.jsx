//import React from 'react'
import api from '../Api';
import { LOGOUT}  from "../api-routes";
import Cookies from 'js-cookie';
export const Logout = async () => {
    try {
        await api.post(LOGOUT);
        // localStorage.removeItem("ACCESS_TOKEN");
        // localStorage.removeItem("REFRESH_TOKEN");
        // Cookies.remove("userId", { path: "/" });
       
    } catch (error) {
        console.error('Logout API error:', error);
        throw error;
    } finally {
         localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        Cookies.remove("userId", { path: "/" });
        Cookies.remove("userName", { path: "/" });
        Cookies.remove("monthlySalary",{path:'/'})
        sessionStorage.clear();

    }
};


