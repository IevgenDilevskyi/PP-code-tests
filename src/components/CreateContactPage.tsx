import React, { useState } from "react";

const CreateContactPage = ({ addContact }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateContact = () => {
    if (firstName && email) {
      addContact({ firstName, lastName, email });
      // Clear the input fields
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };

  return (
    <div>
      <h1>Create Contact</h1>
      <div>
        <label>First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name: </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleCreateContact}>Create Contact</button>
    </div>
  );
};

export default CreateContactPage;
