import React from "react";
import Contact from "./Contact";

const ContactList = ({ contacts, removeContact }) => {
  return (
    <div>
      <h1 className="uppercase font-bold text-3xl text-stone-800">
        Contact List
      </h1>
      <ul className="flex flex-col my-4 max-w-screen-md items-baseline mx-auto">
        {contacts.map((contact) => (
          <Contact
            key={contact.email}
            contact={contact}
            removeContact={removeContact}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
