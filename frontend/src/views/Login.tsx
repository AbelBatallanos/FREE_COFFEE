
import {Link} from "react-router-dom"


export default function Login(){


    return(
        <>
           <h1 className="text-4xl font-bold">Iniciar Sesión</h1>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form>
                   
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
                    
                    <input
                        className="bg-indigo-500 hover:bg-indigo-900 px-5 py-4 text-xl text-white rounded-xl w-full mt-5 font-bold"
                        type="submit"
                        value={"Iniciar Sesión"}
                    />
                </form>
            </div>
            <nav className="mt-5">
                <p>
                ¿No tienes una cuenta aún?
                    <Link to={"/auth"} className="ml-4 hover:text-blue-500 hover:font-bold transition-all ease-in-out">
                    Crea tu cuenta 
                    </Link>
                </p>
                
                
            </nav>
        </>
    )
}