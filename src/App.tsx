import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import CreateContactPage from "./components/CreateContact";
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
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage contacts={contacts} removeContact={removeContact} />
            }
          />
          <Route
            path="/create"
            element={<CreateContactPage addContact={addContact} />}
          />
          <Route
            path="/edit/:email"
            element={
              <EditContact
                // contact={contacts[0]}
                editContact={editContact}
              />
            }
          />
          {/* {(match) => {
              const contact = contacts.find(
                (c) => c.email === match.params.email
              );
              return contact ? (
                <EditContact contact={contact} editContact={editContact} />
              ) : null;
            }}
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
