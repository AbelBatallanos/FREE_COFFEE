import {createRef, useState} from "react"
import { Link } from "react-router-dom";

import Alert from "../components/Alert";
import useAuth from "../hook/useAuth";

export default function Registro(){
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const {register} = useAuth({middleware: 'guest', url: '/'});

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const dataRegister = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        
        await register(dataRegister, setErrores);
    }
    return(
        <>
            <h1 className="text-4xl font-bold">Crea tu Cuenta</h1>
            <p>Crea tu Cuenta llenando el formulaario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleSubmit}>
                    {errores.length > 0 && errores.map((error, index)=>(
                        <Alert key={index} >
                            <p className="mt-2 text-lg">{error}</p>
                        </Alert>
                    ))}
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
                            ref={nameRef}
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
                            ref={emailRef}
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
                            ref={passwordRef}
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
                            ref={passwordConfirmationRef}
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