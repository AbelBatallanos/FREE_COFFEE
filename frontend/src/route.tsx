import {createBrowserRouter} from "react-router-dom"
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Registro from "./views/Registro";
import AdminLayout from "./layouts/AdminLayout";
import Orders from "./components/Orders";
import ProductosAdmin from "./views/ProductosAdmin";



const route = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Inicio/>
            },
           
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children:[
            {
                index:true,
                element:<Registro/>
            },
             {
                path: "/auth/login",
                element:<Login/>
            },
        ]
    },
    {
        path: "/admin",
        element:<AdminLayout/>,
        children:[
            {
                index:true,
                element:<Orders/>
            },
            {
                path: "/admin/productos",
                element:<ProductosAdmin />
            }

        ]
    }
]);


export default route;