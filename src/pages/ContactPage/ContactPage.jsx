import TaskForm from "../../components/TaskList/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import css from "./ContactPage.module.css";
import { useParams } from "react-router-dom";

const ContactPage = () => {
  const { listId } = useParams();
    const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());  
  }, [dispatch]);

    return (
        <div className={css.container}>
        <h1>Task Book for {listId}</h1>
        <TaskForm />
        {loading && <p>Loading..</p>}
        {error && <p>Error 404</p>}
        <TaskList />
      </div>
    );
}

export default ContactPage;