import Styles from '../../styles/Card.module.css';

const CardHeader = ({children}) => {
    return (
        <div className={Styles['card-body']}>
            {children}
        </div>
    )
}

export default CardHeader
