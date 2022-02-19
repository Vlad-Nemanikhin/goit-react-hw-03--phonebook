import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { ContactForm, Label, Tel, Name, Btn } from "./form.styled";

export default class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    number: "",
  };

  hanldeChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  setForm = (e) => {
    const { name, number } = this.state;
    e.preventDefault();

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    this.props.onSubmit(contact);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      id: "",
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <ContactForm onSubmit={this.setForm}>
        <Label htmlFor="name">
          {" "}
          Name
          <Name
            type="text"
            name="name"
            value={name}
            onChange={this.hanldeChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например drian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </Label>
        <Label htmlFor="number">
          Telephone
          <Tel
            type="tel"
            name="number"
            value={number}
            onChange={this.hanldeChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </Label>
        <Btn type="submit">Add contact</Btn>
      </ContactForm>
    );
  }
}
