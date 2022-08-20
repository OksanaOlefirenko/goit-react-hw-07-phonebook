import { List } from './ContactList.styled';
import { ContactItem } from '../ContactItem';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
// import { useState } from 'react';
import { useGetContactsQuery } from 'redux/contactsApi';

export const ContactList = () => {
  const { data, error, isFetching } = useGetContactsQuery();
  console.log(data, error, isFetching);
  // const contacts = useSelector(getContacts);
  const filterContact = useSelector(getFilter);

  const visibleContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filterContact.toLowerCase())
  );

  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id} name={name} number={number} id={id} />
      ))}
    </List>
  );
};
