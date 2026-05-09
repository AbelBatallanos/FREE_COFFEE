import { Outlet } from "react-router-dom"
import SiderAdmin from "../components/SiderAdmin";
import useAuth from "../hook/useAuth";
import { ToastContainer } from "react-toastify/unstyled";
import Modal from "react-modal";
import ModalAdmin from "../components/ModalAdmin";
import useQuiosco from "../hook/useQuiosco";


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


export default function AdminLayout() {

    useAuth({middleware: 'admin'});
    const { modal, handleClickModal, handleAgotarProducto }= useQuiosco();
  return (
        <div className="md:flex gap-4">
            <SiderAdmin/>
            <main className="flex-1 bg-gray-100 p-5">
                <Outlet />
            </main>
            <Modal
                isOpen={modal}  
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ModalAdmin
                    handleClickModal={handleClickModal} 
                    handleAgotarProducto={handleAgotarProducto} />
            </Modal>
            <ToastContainer/>
        </div>
 );           
}
 