import React, { useContext, useEffect } from 'react';
import ContactFilter from '../contacts/ContactFilter';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/contactContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const { error, clearContactErrors } = contactContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearContactErrors();
    }
  }, [clearContactErrors, error, setAlert]);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
