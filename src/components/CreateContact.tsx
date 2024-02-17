import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateContact = ({ addContact }) => {
  const navigate = useNavigate();
  const storedContacts = JSON.parse(localStorage.getItem("contacts") ?? "[]");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleInputChange(identifier, value) {
    if (identifier === "firstName") {
      setFirstName(value);
      setFirstNameError("");
      setResultMsg("");
    } else if (identifier === "lastName") {
      setLastName(value);
      setLastNameError("");
      setResultMsg("");
    } else {
      setEmail(value);
      setEmailError("");
      setResultMsg("");
    }
  }

  const handleCreateContact = () => {
    let isValid = true;

    if (!firstName || firstName.length < 3 || firstName.length > 25) {
      setFirstNameError("First name must be between 3 and 25 characters");
      isValid = false;
    }

    if (lastName && (lastName.length < 2 || lastName.length > 30)) {
      setLastNameError("Last name must be between 2 and 30 characters");
      isValid = false;
    }

    if (!email || !validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (emailExists(email)) {
      setEmailError("Contact with this Email already exists");
      isValid = false;
    }

    if (isValid) {
      addContact({ firstName, lastName, email });
      setResultMsg(`Contact ${email} created successfully!`);
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };

  function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function emailExists(email) {
    return storedContacts.some((contact) => contact.email === email);
  }

  return (
    <div className="max-w-screen-md mx-auto mt-4">
      <h1 className="uppercase my-4 font-bold text-3xl text-stone-800">
        Create Contact
      </h1>
      <div className="mb-4">
        <label className="block text-stone-600">
          First Name <span className=" text-red-600">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="John"
          value={firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className="border p-2 rounded-md"
        />
        {firstNameError && <p className="text-red-500">{firstNameError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-stone-600">Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className="border p-2 rounded-md"
        />
        {lastNameError && <p className="text-red-500">{lastNameError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-stone-600">
          Email <span className=" text-red-600">*</span>
        </label>
        <input
          required
          type="email"
          placeholder="j.doe@example.com"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="border p-2 rounded-md"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
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
        onClick={handleCreateContact}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-2"
      >
        Create Contact
      </button>
      {resultMsg && <p className="mt-2">{resultMsg}</p>}
    </div>
  );
};

export default CreateContact;
