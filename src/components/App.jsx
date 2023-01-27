import { Component } from 'react';
import css from './App.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const styleApp = {
  // height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 40,
  color: '#010101',
};

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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

  handleSubmit = e => {
    e.preventDefault();

    this.setState(prevState => {
      const { name, number, contacts } = prevState;
      const newContact = {
        id: Math.random(),
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

  getFilterContact(contacts, filter, name) {
    return contacts.filter(({ name }) => {
      const normalisedName = name.toLocaleLowerCase();
      const normalisedFilter = filter.toLocaleLowerCase();
      return normalisedName.includes(normalisedFilter);
    });
  }

  removeContact(id) {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  }
  render() {
    const { contacts, name, number, filter } = this.state;
    const filterContacts = this.getFilterContact(contacts, filter, name);

    const contact = filterContacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <button onClick={() => this.removeContact(id)} type="button">
          X
        </button>
      </li>
    ));

    return (
      <div style={styleApp}>
        <div className={css.wrapper}>
          <h2>Phonebook</h2>
          <form onSubmit={this.handleSubmit} className={css.form}>
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
          <input
            onChange={this.handlefilterChange}
            type="text"
            value={filter}
          />
          <ul className="list">{contact}</ul>
        </div>
      </div>
    );
  }
}

export default App;
