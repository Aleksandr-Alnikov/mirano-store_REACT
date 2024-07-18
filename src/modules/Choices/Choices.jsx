import classNames from "classnames";
import './choices.scss';

export const Choices = ({children, buttonLabel, className, isOpen,handleChoicesToggle}) => {

    return (
        <div className={classNames("choices", className)}>
            <button className="choices__btn" type="button" onClick={handleChoicesToggle}>{buttonLabel}</button>

            {isOpen &&  <div className="choices__box">{children}</div>}
        </div>
    )
}