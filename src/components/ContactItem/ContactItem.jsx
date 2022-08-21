import { Item, Button } from './ContactItem.styled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactsApi';
import { Loader } from 'components/Loader';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const ContactItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading: isDeleting, isSuccess }] =
    useDeleteContactMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success('Contact deleted');
    }
  }, [isSuccess]);

  return (
    <Item key={id}>
      <p>
        {name}: {number}
      </p>
      <Button
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isDeleting}
      >
        {isDeleting && <Loader />} Delete
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
