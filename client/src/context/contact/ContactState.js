import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  const intialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispath] = useReducer(contactReducer, intialState);

  //get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispath({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispath({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispath({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispath({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispath({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispath({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
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
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispath({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispath({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //filter contacts
  const filterContacts = (text) => {
    dispath({ type: FILTER_CONTACTS, payload: text });
  };

  //clear Contacts
  const clearContacts = () => {
    dispath({
      type: CLEAR_CONTACTS,
    });
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
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
