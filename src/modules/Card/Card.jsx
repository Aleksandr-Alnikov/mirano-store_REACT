import './card.scss';
import {useDispatch} from "react-redux";
import {addItemToCart} from "../../redux/cartSlice.js";
import {useState} from "react";

export const Card = ({className = "", id, img, title, dateDelivery, price}) => {
    const dispatch = useDispatch();

    const [buttonText, setButtonText] = useState(`${price}\u00A0₽`)

    const handlerAddToCart = () => {
        dispatch(addItemToCart({id, img, title, dateDelivery, price}));
    };

    const handlerMouseEnter = () => {
        setButtonText('В корзину');
    };

    const handlerMouseLeave = () => {
        setButtonText(`${price}\u00A0₽`);
    };

    return (
        <article className={`${className} card`}>
            <img className="card__image" src={img} alt={title} />
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                <div className="card__footer">
                    <p className="card__date-delivery">{dateDelivery}</p>
                    <button className="card__button" onClick={handlerAddToCart} onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>{buttonText}</button>
                </div>
            </div>
        </article>
    );
};