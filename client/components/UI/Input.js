import Styles from '../../styles/Input.module.css';

const Input = ({label, type, name, placeholder, autocomplete}) => {
    return (
        <div className={Styles['input-group']}>
            <label>{label}</label>
            <input type={type ?? 'text'} name={name} placeholder={placeholder} autoComplete={autocomplete}/>
        </div>
    )
}

export default Input
