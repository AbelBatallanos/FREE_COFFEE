import { Link } from "react-router-dom";




export default function Registro(){
    return(
        <>
            <h1 className="text-4xl font-bold">Crea tu Cuenta</h1>
            <p>Crea tu Cuenta llenando el formulaario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="nombre"
                        >Nombre:</label>
                        <input 
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="mt-2 w-full bg-gray-50 p-4 rounded"
                            placeholder="Tú Nombre"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email"
                        >Email:</label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            className="mt-2 w-full bg-gray-50 p-4 rounded"
                            placeholder="ej:  ejemplo@gmail.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password"
                        >Password:</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            className="mt-2 w-full bg-gray-50 p-4 rounded"
                            placeholder="Tú Password"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password_confirmation"
                        >Repetir Password:</label>
                        <input 
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            className="mt-2 w-full bg-gray-50 p-4 rounded"
                            placeholder="Repetir Password"
                        />
                    </div>
                    <input
                        className="bg-indigo-500 hover:bg-indigo-900 px-5 py-4 text-xl text-white rounded-xl w-full mt-5 font-bold"
                        type="submit"
                        value={"Registrar"}
                    />
                </form>

            </div>
            <nav className="mt-5">
                <p>
                ¿Ya tienes una cuenta creada?
                    <Link to={"/auth/login"} className="ml-4 hover:text-blue-500 hover:font-bold transition-all ease-in-out">
                    Iniciar sesión  
                    </Link>
                </p>
                
                
            </nav>
        </>
    );
}