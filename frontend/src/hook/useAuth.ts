import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function useAuth({middleware, url}) {

    const navigate = useNavigate();
    
    const { data: user, error, mutate } = useSWR('/user', async () => { // endpoint para obtener el usuario autenticado 
        const token = localStorage.getItem("token");
        try {
            const response = await clienteAxios("/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw Error(error?.response?.data?.message || 'Error de autenticación');
        }
    });

    const register = async (data, setErrores) => {
        try {
            const response = await clienteAxios.post('/register', data);
            console.log(response);
            localStorage.setItem('token', response.data.token);
            setErrores([]);
            mutate(); // Actualiza el estado del usuario después de registrarse
        } catch (error) {
            console.log(error.response);
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const login = async (data, setErrores) => {
        try {
            const response = await clienteAxios.post('/login', data);
            localStorage.setItem('token', response.data.token);
            console.log(response);
            setErrores([]);
            mutate(); // Actualiza el estado del usuario después de iniciar sesión
        } catch (error) {
            console.log(error.response);
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async () => {
        try {
            const response = await clienteAxios.post('/logout', {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            mutate(null); // Limpia el estado del usuario después de cerrar sesión
            navigate('/auth/login');
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(()=>{
        if(middleware === "admin" && user && user.admin){
            navigate("/admin");
        }

        if(middleware === "auth" && user && !user.admin){
            navigate("/");
        }

        if(middleware === "guest" && url && user){
            navigate(url);
        }

        if(middleware === "auth" && error){
            navigate('/auth/login');
        }
    }
    ,[error, user])

    return {
        register,
        login,  
        logout,
        user,
        error,
    }
}