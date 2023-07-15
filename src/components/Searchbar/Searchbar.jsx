import  { useState } from 'react';
import css from './Searcnbar.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export const Searchbar = ({onSubmit}) => {
   const [query, setQuery] = useState('');
const onChange = event => {
  setQuery(event.target.value.trim());
  console.log(event.target.value.trim())
  };
const onForm = event => {
    event.preventDefault();
    if (query === ""){
       Notiflix.Notify.info("The search bar cannot be empty. Please type criteria in the search bar")
      return;
    }
    
    onSubmit(query);
    setQuery(""); 
  };

    return (
        <header className={css.searchbar}>
  <form className={css.form} onSubmit={event => onForm(event)}>
    <button type="submit" className={css.button}>
      <span className={css.buttonlabel}>Search</span>
          </button>

    <input
      className={css.input}
      type="text"
      name="query"
      onChange={onChange}
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};