import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { selectContacts } from "../redux/selectors";
import { fetchContacts } from "../redux/operations";
import "../index.css";

const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="main__container">
      <div className="backdrop"></div>
      <div className="backdrop2"></div>
      <div className="backdrop3"></div>
      <div className="content"></div>
      <div>
        <h1>Phonebook</h1>
      </div>
      <ContactForm />
      {contacts.length > 0 ? (
        <>
          <h2>Contacts</h2>
          <Filter />
        </>
      ) : (
        <p>Your phonebook is empty. Add first contact!</p>
      )}
      {contacts.length > 0 && <ContactList />}
    </div>
  );
};

export default App;
