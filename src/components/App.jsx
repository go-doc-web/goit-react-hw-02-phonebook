import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactsForm from './ContactsForm/ContactsForm';

import contacts from './contacts';

import css from './App.module.css';

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

  addContact = ({ name, number }) => {
    if (this.dublicate(name)) {
      return alert('Такой пользователь уже есть');
    }
    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };

  getFilterContact = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  removeContact = id => {
    console.log(id);
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return { contacts: newContact };
    });
  };
  render() {
    const { removeContact, handlefilterChange, addContact, getFilterContact } =
      this;
    const filterContacts = getFilterContact();

    return (
      <div style={styleApp}>
        <div className={css.wrapper}>
          <h2>Phonebook</h2>
          <ContactsForm onSubmit={addContact} />
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
