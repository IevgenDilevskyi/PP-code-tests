import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = ({ contact, removeContact }) => {
  const navigate = useNavigate();

  return (
    <li className="flex flex-row w-3/4 justify-between my-1">
      <div>
        {contact.firstName} {contact.lastName} - {contact.email}
      </div>
      <div className=" flex self-end">
        <button
          className="mx-2 rounded-md border-2 border-stone-800 bg-stone-800 text-amber-400 hover:text-amber-500  px-2 py-1"
          onClick={() => navigate(`/edit/${contact.email}`)}
        >
          Edit
        </button>
        <button
          className="mx-2 rounded-md border-2 border-stone-800 bg-stone-800 text-amber-400 hover:text-amber-500 px-2 py-1"
          onClick={() => removeContact(contact.email)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;
