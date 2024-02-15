import React, { useState } from "react";

const EditContactPage = ({ contact, editContact }) => {
  const [newFirstName, setNewFirstName] = useState(contact.firstName);
  const [newLastName, setNewLastName] = useState(contact.lastName);

  const handleEditContact = () => {
    if (newFirstName) {
      editContact({
        ...contact,
        firstName: newFirstName,
        lastName: newLastName,
      });
    }
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <div>
        <label>New First Name: </label>
        <input
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>New Last Name: </label>
        <input
          type="text"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
      </div>
      <button onClick={handleEditContact}>Save Changes</button>
    </div>
  );
};

export default EditContactPage;
