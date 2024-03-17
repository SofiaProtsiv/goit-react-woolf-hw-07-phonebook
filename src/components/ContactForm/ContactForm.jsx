import { useState } from "react";
import { nanoid } from "nanoid";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useSelector, useDispatch } from "react-redux";
import { selectVisibleContacts } from "../../redux/selectors";
import { addContacts } from "../../redux/operations";

const nameInputId = nanoid();
const numberInputId = nanoid();

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notify.failure(`${name} is already in contacts.`);
    } else if (contacts.find((contact) => contact.number === number)) {
      Notify.failure(`${number} is already in contacts.`);
    } else {
      dispatch(addContacts({ name, number }))
        .unwrap()
        .then(() => {
          Notify.success(`New contact added`);
        })
        .catch(() => {
          Notify.failure(`smth went wrong`);
        });

      setName("");
      setNumber("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
            required
          />
        </label>

        <label htmlFor={numberInputId}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
