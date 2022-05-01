import Styles from '../../styles/Card.module.css';

const Card = ({className, children}) => {
    return (
        <div className={Styles.card + ' ' + className}>
            {children}
        </div>
    )
}

export default Card
