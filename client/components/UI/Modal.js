import {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Styles from "../../styles/Modal.module.css";
import {XIcon} from "@heroicons/react/outline";

const Modal = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modal = show ? (
        <>
            <div className={Styles.modalOverlay} onClick={handleCloseClick}></div>
            <div className={Styles.modal}>
                <div className={Styles.modalHeader}>
                    <h2>{title}</h2>
                    <button onClick={handleCloseClick}><XIcon className={"h-7 w-7"}/></button>
                </div>
                <div className={Styles.modalBody}>
                    {children}
                </div>
            </div>
        </>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modal,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
}

export default Modal
