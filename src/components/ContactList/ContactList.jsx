import { useSelector } from "react-redux";
import { selectVisibleContacts } from "../../redux/selectors";
import ContactItem from "components/ContactItem/ContactItem";

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);

  return (
    <div className="contact__list">
      <ul>
        {contacts.length === 0 ? (
          <p>Nothing found</p>
        ) : (
          contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ContactList;
