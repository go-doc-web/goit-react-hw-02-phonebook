import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import ContactsList from './ContactsList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

import contacts from './contacts';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const styleApp = {
  // height: '100vh',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  fontSize: 32,
  color: '#010101',
};

class App extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
    name: '',
    number: '',
  };

  handleClickChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handlefilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  dublicate(name) {
    const { contacts } = this.state;
    const normalisedName = name.toLocaleLowerCase();
    const dublContact = contacts.find(
      ({ name }) => name.toLowerCase() === normalisedName
    );
    return Boolean(dublContact);
  }

  addContact = e => {
    e.preventDefault();
    const { name } = this.state;
    if (this.dublicate(name)) {
      this.reset();
      return alert('Такой пользователь уже есть');
    }
    this.setState(prevState => {
      const { name, number, contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
    this.reset();
  };

  reset() {
    this.setState({ ...INITIAL_STATE });
  }

  getFilterContact() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  removeContact = id => {
    console.log(id);
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return { contacts: newContact };
    });
  };
  render() {
    const { name, number } = this.state;
    const { removeContact, handlefilterChange } = this;
    const filterContacts = this.getFilterContact();

    return (
      <div style={styleApp}>
        <div className={css.wrapper}>
          <h2>Phonebook</h2>
          <form onSubmit={this.addContact} className={css.form}>
            <label>
              <span>Name</span>
              <input
                onChange={this.handleClickChange}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                placeholder="Fedor Fedorov"
              />
            </label>
            <label>
              <span>Number</span>
              <input
                onChange={this.handleClickChange}
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                placeholder="227-91-26"
              />
            </label>
            <button type="submit">Add contact</button>
          </form>
        </div>
        <div className={css.ListContact}>
          <h2>Contacts</h2>
          <ContactFilter handlefilterChange={handlefilterChange} />
          <ContactsList items={filterContacts} removeContact={removeContact} />
        </div>
      </div>
    );
  }
}

export default App;
