import { Outlet } from "react-router-dom";
import Resumen from "../components/Resumen";
import Sidear from "../components/Sidear";
import useQuiosco  from "../hook/useQuiosco";
import Modal from "react-modal";
import ModalProducto from "../components/ModalProducto";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useAuth from "../hook/useAuth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "800px",
  },
};

Modal.setAppElement("#root");

export default function Layout(){

    useAuth({middleware: 'auth'});
    const { modal }= useQuiosco();
    console.log(modal)
    return(
        <div className="md:flex gap-4">
            <Sidear/>
            <main className="flex-1 bg-gray-100 p-5">
                <Outlet />
            </main>
            <Resumen/>
            
            <Modal
                isOpen={modal}
                style={customStyles}
                contentLabel="Example Modal"
            >  
                <ModalProducto/>
            </Modal>
            <ToastContainer />

        </div>
    );
}