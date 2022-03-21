import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4> Please Add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;
