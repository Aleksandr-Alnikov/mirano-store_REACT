// import '../Choices/choices.scss';
import './filter.scss';
import {Choices} from "../Choices/Choices";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../redux/goodsSlice.js";
import {debounce, grtValidFilters} from "../../util.js";

export const Filter = () => {
    const dispatch = useDispatch();
    const [openChoice, setOpenChoice] = useState(null);

    const [filters, setFilters] = useState({
        type: 'bouquets',
        minPrice: '',
        maxPrice: '',
        category: '',
    });

    const prevFiltersRef = useRef(filters);

    const debouncedFetchGoods = useRef(
        debounce((filters) => {
            dispatch(fetchGoods(filters));
        }, 500),
    ).current;

    useEffect(() => {
        const prevFilters = prevFiltersRef.current;
        const validFilter = grtValidFilters(filters);
        if (prevFilters.type !== filters.type) {
            dispatch(fetchGoods(validFilter));
        } else {
            debouncedFetchGoods(filters);
        }
        prevFiltersRef.current = filters;
    }, [dispatch, debouncedFetchGoods, filters]);

    const handleChoicesToggle = (index) => {
        setOpenChoice(openChoice === index ? null : index);
    };

    const handleTypeChange = ({target}) => {
        const {value} = target;
        const newFilters = {...filters, type: value, minPrice: '', maxPrice: ''};
        setFilters(newFilters);
    };

    const handlePriceChange = ({target}) => {
        const {name, value} = target;
        const newFilters = {...filters, [name]: !isNaN(parseInt(value, 10)) ? value : ""};
        setFilters(newFilters);
    };


    return (
    <section className="filter">
        <h2 className="visually-hidden"></h2>
        <div className="container">
            <form className="filter__form">
                <fieldset className="filter__group">
                    <input className="filter__radio" type="radio" name="type" value="bouquets" id="flower" checked={filters.type === 'bouquets'} onChange={handleTypeChange}/>
                    <label className="filter__label filter__label_flower"
                           htmlFor="flower">Цветы</label>

                    <input className="filter__radio" type="radio" name="type" value="toys" id="toys" checked={filters.type === 'toys'} onChange={handleTypeChange}/>
                    <label className="filter__label filter__label_toys"
                           htmlFor="toys">Игрушки</label>

                    <input className="filter__radio" type="radio" name="type" value="postcards" id="postcard" checked={filters.type === 'postcards'} onChange={handleTypeChange}/>
                    <label className="filter__label filter__label_postcard"
                           htmlFor="postcard">Открытки</label>
                </fieldset>

                <fieldset className="filter__group filter__group_choices">
                    <Choices buttonLabel="Цена" isOpen={openChoice === 0} handleChoicesToggle={() => handleChoicesToggle(0)}>
                        <fieldset className="filter__price">
                            <input className="filter__input-price" type="text" name="minPrice" placeholder="от" value={filters.minPrice} onChange={handlePriceChange}/>
                            <input className="filter__input-price" type="text" name="maxPrice" placeholder="до" value={filters.maxPrice} onChange={handlePriceChange}/>
                        </fieldset>
                    </Choices>

                    <Choices buttonLabel='Тип товара' isOpen={openChoice === 1} handleChoicesToggle={() => handleChoicesToggle(1)}>

                        <ul className="filter__type-list">
                            <li className="filter__type-item">
                                <button className="filter__type-button"
                                        type="button">Монобукеты
                                </button>
                            </li>
                            <li className="filter__type-item">
                                <button className="filter__type-button" type="button">Авторские
                                    букеты
                                </button>
                            </li>
                            <li className="filter__type-item">
                                <button className="filter__type-button" type="button">Цветы в
                                    коробке
                                </button>
                            </li>
                            <li className="filter__type-item">
                                <button className="filter__type-button" type="button">Цветы в
                                    корзине
                                </button>
                            </li>
                            <li className="filter__type-item">
                                <button className="filter__type-button" type="button">Букеты из
                                    сухоцветов
                                </button>
                            </li>
                        </ul>
                    </Choices>
                </fieldset>
            </form>
        </div>
    </section>)
};