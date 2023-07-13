import PropTypes from 'prop-types';
import css from "./Button.module.css"

export const Button = ({ nextPage }) => {
    return (
        <div>
            <button className={css.load_more} type="button" onClick={nextPage}>Load more</button>
        </div>
    )
}
Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};