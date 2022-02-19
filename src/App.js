import React, { Component } from "react";
import "./App.css";
import Form from "./form/index";
import Filter from "./filter/index";
import ContactList from "./contactList/index";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contactsList = localStorage.getItem("contactsList");
    const parsedContacts = JSON.parse(contactsList);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem("contactsList", JSON.stringify(contacts));
    }
  }

  addContact = (contact) => {
    const { contacts } = this.state;
    const foundName = contacts.find(({ name }) => name === contact.name);
    const foundNumber = contacts.find(
      ({ number }) => number === contact.number
    );

    if (foundName) {
      alert(`${contact.name} is already on contacts`);
      return;
    } else if (foundNumber) {
      alert(`${contact.number} is already on contacts`);
      return;
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  handleChange = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleRemove = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el) => el.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filterRegister = filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterRegister)
    );
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Phonebook</h1>

        <Form onSubmit={this.addContact} />

        <h2 style={{ textAlign: "center" }}>Contacts</h2>
        <Filter value={filter} onChange={this.handleChange} />

        <ContactList
          contactsList={filteredContacts}
          onRemove={this.handleRemove}
        />
      </>
    );
  }
}
