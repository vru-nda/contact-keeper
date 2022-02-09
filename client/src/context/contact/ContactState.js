import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const intialState = {
    contacts: [
      {
        id: '1',
        name: 'Prashant Bhavsara',
        email: 'prashuu@gmail.com',
        phone: '123-456-7895',
        type: 'personal',
      },
      {
        id: '2',
        name: 'Manan Upadhyay',
        email: 'manan@gmail.com',
        phone: '123-456-7895',
        type: 'professional',
      },
    ],
  };
  const [state, dispath] = useReducer(contactReducer, intialState);

  //Add contact
  const addContact = (contact) => {
    console.log(contact);
    contact.id = uuid();
    console.log(contact);
    dispath({ type: ADD_CONTACT, payload: contact });
  };

  //delete contact

  //set current contact

  //delete current contact

  //update contact

  //filter contacts

  //clear filter
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
