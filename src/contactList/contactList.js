import React from "react";
import PropTypes from "prop-types";
import { Insert, Text, Button, Link } from "./contacts.styled";

const ContactList = ({ contactsList, onRemove }) => {
  return contactsList.map(({ id, name, number }) => (
    <Insert key={id}>
      <Text>{name}:</Text>
      <Link href={`tel:${number}`}>{number}</Link>
      <Button type="button" onClick={() => onRemove(id)}>
        Delete
      </Button>
    </Insert>
  ));
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

export default ContactList;
