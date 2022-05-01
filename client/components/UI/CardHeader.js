import Styles from '../../styles/Card.module.css';

const CardHeader = ({title}) => {
    return (
        <div className={Styles['card-header']}>
            <h4 className={Styles["card-header-title"]}>{title}</h4>
        </div>
    )
}

export default CardHeader
