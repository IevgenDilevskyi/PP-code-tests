import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import CreateContact from "./components/CreateContact";
import EditContact from "./components/EditContact";
import { mockContacts } from "./mockData";

interface Contact {
  firstName: String;
  lastName: String;
  email: String;
}

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(mockContacts);
    localStorage.setItem("contacts", JSON.stringify(mockContacts));
  }, []);

  const addContact = (contact: Contact) => {
    const newContacts = [...contacts, contact];
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const removeContact = (email: string) => {
    const newContacts = contacts.filter((contact) => contact.email !== email);
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const editContact = (updatedContact) => {
    const newContacts = [...contacts];
    const index = newContacts.findIndex(
      (contact) => contact.email === updatedContact.email
    );
    if (index !== -1) {
      newContacts[index] = updatedContact;
      setContacts(newContacts);
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <ul className="flex gap-4 justify-end mb-16 text-2xl font-medium uppercase">
            <button className=" rounded px-2 text-amber-400 hover:text-amber-500 bg-stone-800">
              <Link to="/">Home</Link>
            </button>
            <button className=" rounded px-2 text-amber-400 hover:text-amber-500 bg-stone-800">
              <Link to="/create">Create Contact</Link>
            </button>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <ContactList contacts={contacts} removeContact={removeContact} />
            }
          />
          <Route
            path="/create"
            element={<CreateContact addContact={addContact} />}
          />
          <Route
            path="/edit/:email"
            element={<EditContact editContact={editContact} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
