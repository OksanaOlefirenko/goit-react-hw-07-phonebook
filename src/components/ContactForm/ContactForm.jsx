import { Form, Label, Input, Button } from './ContactForm.styled';
import { useState } from 'react';
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from 'redux/contactsApi';
import { Loader } from 'components/Loader';
import { toast } from 'react-hot-toast';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = { name, phone };
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (findName) {
      return toast.error(`${name} is already in contacts.`);
    }
    const findNumber = contacts.find(contact => contact.phone === phone);
    if (findNumber) {
      return toast.error('This phone number is already in contacts.');
    }
    createContact(contact);
    setName('');
    setPhone('');
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
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </Label>
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader size={20} />} Add contact
      </Button>
    </Form>
  );
};
