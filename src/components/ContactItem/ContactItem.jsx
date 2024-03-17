import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContacts, editContacts } from "../../redux/operations";

import { Modal, Input, Button } from "antd";

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(contact.name);
  const [newNumber, setNewNumber] = useState(contact.number);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContacts(contactId));
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSave = () => {
    setShowModal(false);
    dispatch(
      editContacts({
        id: contact.id,
        name: newName,
        number: newNumber,
      })
    );
  };
  return (
    <>
      <li className="contact__item">
        <div>
          <p>{contact.name}</p>
          <p>{contact.number}</p>
        </div>
        <div>
          <button type="button" name="edit" onClick={() => setShowModal(true)}>
            Edit
          </button>
          <button
            type="button"
            name="delete"
            onClick={() => handleDeleteContact(contact.id)}
          >
            Delete
          </button>
        </div>
      </li>

      <Modal
        open={showModal}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <div className="modal-content">
          <label>New Name:</label>
          <Input
            type="text"
            value={newName}
            onChange={handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
            required
          />
          <label>New Number:</label>
          <Input
            type="text"
            value={newNumber}
            onChange={handleNumberChange}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            required
          />
        </div>
      </Modal>
    </>
  );
};

export default ContactItem;
