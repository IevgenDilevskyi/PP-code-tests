import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = ({ contact, removeContact }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${contact.email}`);
  };

  return (
    <li>
      {contact.firstName} {contact.lastName} - {contact.email}
      <button onClick={() => handleEdit()}>Edit</button>
      <button onClick={() => removeContact(contact.email)}>Delete</button>
    </li>
  );
};

export default Contact;
