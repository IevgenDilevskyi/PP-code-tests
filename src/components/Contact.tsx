import React from "react";

const Contact = ({ contact, removeContact }) => {
  return (
    <li>
      {contact.firstName} {contact.lastName} - {contact.email}
      <button onClick={() => removeContact(contact.email)}>Remove</button>
    </li>
  );
};

export default Contact;
