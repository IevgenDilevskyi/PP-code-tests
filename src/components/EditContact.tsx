import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="mt-8 max-w-screen-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-stone-800">Edit Contact</h1>
      <div className="mb-4">
        <label className="block text-stone-600">
          New First Name <span className=" text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="John"
          value={firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {firstNameError && <p className="text-red-500">{firstNameError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-stone-600">New Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {lastNameError && <p className="text-red-500">{lastNameError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-stone-600">
          Email <span className=" text-red-600">*</span>
        </label>
        <input
          type="email"
          value={contact?.email}
          disabled
          className="p-2 border rounded-md bg-gray-200 cursor-not-allowed"
        />
      </div>
      <p className="mb-2 text-gray-500">
        <span className=" text-red-600">*</span> Required field
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-2"
      >
        Cancel
      </button>
      <button
        onClick={handleEditContact}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-2"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditContact;
