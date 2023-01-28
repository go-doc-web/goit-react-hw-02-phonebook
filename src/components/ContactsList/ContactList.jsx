import PropTypes from 'prop-types';

// import css from './ContactsList.module.css';

const ContactsList = ({ children }) => {
  return <ul className="list">{children}</ul>;
};

export default ContactsList;

ContactsList.propTypes = {
  children: PropTypes.element.isRequired,
};
