import { Form, Label, Input, Button } from './ContactForm.styled';
import { nanoid } from 'nanoid';
// import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useCreateContactMutation } from 'redux/contactsApi';
import { Loader } from 'components/Loader';
import { toast } from 'react-hot-toast';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const dispatch = useDispatch();
  // const contacts = useSelector(getContacts);
  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = { id: nanoid(), name, number };
    // const findName = contacts.find(
    //   contact => contact.name.toLowerCase() === name.toLowerCase()
    // );

    // if (findName) {
    //   return alert(`${name} is already in contacts.`);
    // }
    // const findNumber = contacts.find(contact => contact.number === number);
    // if (findNumber) {
    //   return alert(`This phone number is already in contacts.`);
    // }
    createContact(contact);
    setName('');
    setNumber('');
    toast.success('Сontact added');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </Label>

      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </Label>
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader size={12} />} Add contact
      </Button>
    </Form>
  );
};
