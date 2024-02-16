import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockContacts } from "../mockData";

const EditContact = ({ editContact }) => {
  const navigate = useNavigate();
  const { email } = useParams();
  const storedContacts = JSON.parse(localStorage.getItem("contacts") ?? "[]");
  const contact = storedContacts.find((contact) => contact.email === email);

  const [firstName, setFirstName] = useState(contact?.firstName);
  const [lastName, setLastName] = useState(contact?.lastName);

  const handleEditContact = () => {
    if (firstName) {
      editContact({
        ...contact,
        firstName: firstName,
        lastName: lastName,
      });
    }
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <div>
        <label>New First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>New Last Name: </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email: </label>
        <input type="text" value={contact?.email} disabled />
      </div>
      <button onClick={handleEditContact}>Save Changes</button>
    </div>
  );
};

export default EditContact;
