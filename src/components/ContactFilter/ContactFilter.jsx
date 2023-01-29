import PropTypes from 'prop-types';

import css from './ContactFilter.module.css';

const ContactFilter = ({ handlefilterChange, filter }) => {
  return (
    <div className="{css.wrapper}">
      <label className={css.titleFilter}>*Find contact by name</label>
      <input
        onChange={handlefilterChange}
        type="text"
        name="filter"
        value={filter}
        placeholder="Find me"
      />
    </div>
  );
};

export default ContactFilter;

ContactFilter.propTypes = {
  handlefilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
