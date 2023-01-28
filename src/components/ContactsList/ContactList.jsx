import PropTypes from 'prop-types';

import css from './Contacts.module.css';

const ContactsList = ({ items, removeContact }) => {
  const contact = items.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}
      <button onClick={() => removeContact(id)} type="button">
        X
      </button>
    </li>
  ));
  return <ul className="list">{contact}</ul>;
};

export default ContactsList;

ContactsList.defaultProps = {
  items: [],
};

ContactsList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
