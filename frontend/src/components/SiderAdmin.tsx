import useAuth from '../hook/useAuth';
import { Link } from 'react-router-dom';


export default function SiderAdmin() {
    const {logout} = useAuth({middleware: 'auth'});    
    return (
        <aside className="md:w-64 h-screen bg-gray-200 text-white p-5">
            <h2 className="text-2xl text-black font-black mb-5">Admin Panel</h2>
            <div>
                <img src={`/img/logo.svg`} alt="Admin" className=" size-30 " />
            </div>
            <nav>
                <ul className="mt-5">
                    <li className="mb-3">
                        <Link to="/admin/dashboard" className="block text-black font-bold py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/admin/productos" className="block text-black font-bold py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
                            Productos
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/admin/orders" className="block text-black font-bold py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
                            Orders
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/admin/users" className="block text-black font-bold py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
                            Users
                        </Link>
                    </li>
                </ul>
            </nav>

            <div>

                <button type='button' onClick={logout} className='bg-red-700 hover:bg-red-900 p-3 w-full text-white font-bold text-xl'>
                    Cerrar Sesión
                </button>

            </div>

        </aside>
    )
}

