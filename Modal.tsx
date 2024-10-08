
import './modal.css'
import FormUser from "./FormUser";




function Modal({ active, setActive, children}) {
 
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal__content active' : 'modal__content' } onClick={(e) => e.stopPropagation()}>
                <FormUser/>
            </div>
            {children}
        </div>
    )
}

export default Modal;