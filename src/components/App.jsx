import React, { useEffect, useState } from 'react';
import Phonebook from './Phonebook/Phonebook';
import { nanoid } from 'nanoid';
import Contacts from './Contacts/Contacts';
import Filters from './Filters/Filters';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';



const App = () => {

  const dispatch = useDispatch();

  const contactsRed = useSelector((state)=> state.contactsStore.contacts)
  console.log('contactsRed: ', contactsRed);
  const filterState = useSelector(( state )=> state.filtersStore.filters)
  console.log('filterRed: ', filterState);
  

  // const localContacts = () => JSON.parse(localStorage.getItem('contacts')) || [];

  // const [contactsState, setContacts] = useState(localContacts);
  // const [filter, setFilter] = useState('');

  const handleAddContact = contacts => {
    const hasDuplicatesName = contactsRed.some(
      contact => contact.name.toLowerCase() === contacts.name.toLowerCase()
    );

    const hasDuplicatesNumber = contactsRed.some(
      contact => contact.number === contacts.number
    );

    if (hasDuplicatesName) {
      alert(`${contacts.name} is already in contacts`);
      return;
    } else if (hasDuplicatesNumber) {
      alert(`${contacts.number} is already in contacts`);
      return;
    }

    const uniqueId = nanoid();
    const formattedName =
      contacts.name.charAt(0).toUpperCase() + contacts.name.slice(1);

    const finalContact = {
      id: uniqueId,
      name: formattedName,
      number: contacts.number,
    };
    
 const addProduct = {
  type: 'contacts/addContacts',
  payload: finalContact,
 }

 dispatch(addProduct)
    // setContacts([...contactsState, finalContact]);
  };

  const hendleDeletedContact = id => {
    const deletProductAction = {
      type: 'contacts/deleteContacts',
      payload: id,
    }

    dispatch(deletProductAction)
  };
 

  const handleFilterContact = evt => {
    const filterContacts = {
      type: 'filters/changeFilter',
      payload: evt.target.value,
    }
    dispatch(filterContacts)
  };
  

  const getContacts = () => {
    const filterLowerCase = filterState.toLowerCase();

    return contactsRed.filter(({ name }) =>
      name.toLowerCase().includes(filterLowerCase)
    );
  };

  //--------------------------------------

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactsRed));
  }, [contactsRed]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Phonebook
        handleAddContact={handleAddContact}
        contactState={contactsRed}
      />

      <div className={css.filtersWrap}>
        <h2 className={css.title}>Contacts</h2>
        {contactsRed.length ? (
          <Filters handleFilterContact={handleFilterContact} value={filterState} />
        ) : (
          <h2 className={css.title}>Создайте первый контакт</h2>
        )}
      </div>
      <Contacts
        contacts={getContacts()}
        hendleDeletedContact={hendleDeletedContact}
      />
    </div>
  );
};

export default App;