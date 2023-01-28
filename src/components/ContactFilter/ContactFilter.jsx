import PropTypes from 'prop-types';
import css from './ContactFilter.module.css';

const ContactFilter = ({ handlefilterChange }) => {
  return (
    <div>
      <label>Find contact by name</label>
      <input onChange={handlefilterChange} type="text" name="filter" />
    </div>
  );
};

export default ContactFilter;

ContactFilter.propTypes = {
  handlefilterChange: PropTypes.func.isRequired,
};
