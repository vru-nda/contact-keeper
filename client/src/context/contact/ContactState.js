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
    current: null,
    filtered: null,
  };
  const [state, dispath] = useReducer(contactReducer, intialState);

  //Add contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispath({ type: ADD_CONTACT, payload: contact });
  };

  //delete contact
  const deleteContact = (id) => {
    dispath({ type: DELETE_CONTACT, payload: id });
  };

  //set current contact
  const setCurrent = (contact) => {
    dispath({ type: SET_CURRENT, payload: contact });
  };

  //clear current contact
  const clearCurrent = () => {
    dispath({ type: CLEAR_CURRENT });
  };

  //update contact
  const updateContact = (contact) => {
    dispath({ type: UPDATE_CONTACT, payload: contact });
  };

  //filter contacts
  const filterContacts = (text) => {
    dispath({ type: FILTER_CONTACTS, payload: text });
  };

  //clear filter
  const clearFilter = () => {
    dispath({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
