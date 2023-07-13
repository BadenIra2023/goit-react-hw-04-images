import React, { Component } from 'react';
import css from './Searcnbar.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
   state = {
    query: '',
  };
   onChange = event => {
     this.setState({ query: event.target.value.trim() });
  };
  onSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    if (query === ""){
       Notiflix.Notify.info("The search bar cannot be empty. Please type criteria in the search bar")
      return;
    }
    
    this.props.onSubmit(query);
    this.setState({ query:"" });
  };

  render() {
    return (
        <header className={css.searchbar}>
  <form className={css.form} onSubmit={this.onSubmit}>
    <button type="submit" className={css.button}>
      <span className={css.buttonlabel}>Search</span>
          </button>

    <input
      className={css.input}
      type="text"
      name="query"
      onChange={this.onChange}
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};