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
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  function handleInputChange(identifier, value) {
    if (identifier === "firstName") {
      setFirstName(value);
      setFirstNameError("");
    } else {
      setLastName(value);
      setLastNameError("");
    }
  }

  const handleEditContact = () => {
    let isValid = true;

    if (!firstName || firstName.length < 3 || firstName.length > 25) {
      setFirstNameError("First name must be between 3 and 25 characters");
      isValid = false;
    }

    if (lastName && (lastName.length < 2 || lastName.length > 30)) {
      setLastNameError("Last name must be between 2 and 30 characters");
      isValid = false;
    }

    if (isValid) {
      editContact({
        ...contact,
        firstName: firstName,
        lastName: lastName,
      });
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <div>
        <label>New First Name: </label>
        <input
          type="text"
          placeholder="John"
          value={firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        {firstNameError && <p>{firstNameError}</p>}
      </div>
      <div>
        <label>New Last Name: </label>
        <input
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
        {lastNameError && <p>{lastNameError}</p>}
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
