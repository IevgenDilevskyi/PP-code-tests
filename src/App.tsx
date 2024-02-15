// import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import CreateContactPage from "./components/CreateContactPage";
import EditContactPage from "./components/EditContactPage";
import { mockContacts } from "./mockData";

interface Contact {
  firstName: String;
  lastName: String;
  email: String;
}

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    // if (storedContacts) {
    //   setContacts(storedContacts);
    // }
    // else {
    // fetch("/path-to-your/defaultData.json")
    //   .then((response) => response.json())
    //   .then((defaultData) => {
    //     setContacts(defaultData);
    //     localStorage.setItem("contacts", JSON.stringify(defaultData));
    //   })
    //   .catch((error) => console.error("Error loading default data:", error));
    // // }
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
          <Route path="/">
            <MainPage contacts={contacts} removeContact={removeContact} />
          </Route>
          {/* <Route path="/create"> */}
          {/* <CreateContactPage addContact={addContact} /> */}
          {/* <div>CREATEPAGE</div>
          </Route> */}
          {/* <Route path="/edit/:email">
            {(match) => {
              const contact = contacts.find(
                (c) => c.email === match.params.email
              );
              return contact ? (
                <EditContactPage contact={contact} editContact={editContact} />
              ) : null;
            }}
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
