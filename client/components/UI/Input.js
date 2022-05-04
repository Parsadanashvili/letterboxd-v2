import Styles from '../../styles/Input.module.css';
import {forwardRef} from "react";

const Input = forwardRef(function Input({label, type, name, placeholder, autocomplete = '', onChange}, ref) {
    return (
        <div className={Styles['input-group']}>
            <label>{label}</label>
            <input ref={ref} type={type ?? 'text'} name={name} placeholder={placeholder} autoComplete={autocomplete.toString() ?? false} onChange={onChange}/>
        </div>
    )
})

export default Input
