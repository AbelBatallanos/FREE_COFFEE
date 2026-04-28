import { Outlet } from "react-router-dom";
import Resumen from "../components/Resumen";
import Sidear from "../components/Sidear";



export default function Layout(){
    return(
        <div className="md:flex gap-4">
            <Sidear/>
            <main className="flex-1 bg-gray-100 p-5">
                <Outlet />
            </main>
            <Resumen/>
        </div>
    );
}