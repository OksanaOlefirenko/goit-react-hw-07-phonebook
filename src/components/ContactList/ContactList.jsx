import { List } from './ContactList.styled';
import { ContactItem } from '../ContactItem';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import { useGetContactsQuery } from 'redux/contactsApi';
import { Loader } from 'components/Loader';
import { useMemo } from 'react';

export const ContactList = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery();

  const filterContact = useSelector(getFilter);

  const visibleContacts = useMemo(() => {
    return (
      contacts?.filter(({ name }) =>
        name.toLowerCase().includes(filterContact.toLowerCase())
      ) ?? []
    );
  }, [filterContact, contacts]);

  return (
    <>
      {error && <p>Contacts not found</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <List>
          {visibleContacts?.map(({ id, name, phone }) => (
            <ContactItem key={id} name={name} number={phone} id={id} />
          ))}
        </List>
      )}
    </>
  );
};
