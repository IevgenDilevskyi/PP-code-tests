import React from "react";
import Contact from "./Contact";

const MainPage = ({ contacts, removeContact }) => {
  return (
    <div>
      <h1>Contact List</h1>
      {/* <ul>
        {contacts.map((contact, index) => (
          <Contact
            key={index}
            contact={contact}
            removeContact={removeContact}
          />
        ))}
      </ul> */}
    </div>
  );
};

export default MainPage;
