import React, { useState } from "react";

const CreateContactPage = ({ addContact }) => {
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

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
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

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div>
      <h1>Create Contact</h1>
      <div>
        <label>First Name *: </label>
        <input
          required
          type="text"
          minLength={3}
          maxLength={25}
          placeholder="John"
          value={firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        {firstNameError && <p>{firstNameError}</p>}
      </div>
      <div>
        <label>Last Name: </label>
        <input
          type="text"
          minLength={2}
          maxLength={30}
          placeholder="Doe"
          value={lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
        {lastNameError && <p>{lastNameError}</p>}
      </div>
      <div>
        <label>Email *: </label>
        <input
          required
          type="email"
          placeholder="j.doe@example.com"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <p>* Required field</p>
      <button onClick={handleCreateContact}>Create Contact</button>
      {resultMsg && <p>{resultMsg}</p>}
    </div>
  );
};

export default CreateContactPage;
