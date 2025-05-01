import TaskForm from "../../components/TaskList/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";

type RouteParams = {
  listId: string;
}

const ContactPage = () => {
  const { listId } = useParams<RouteParams>(); 
  const dispatch = useDispatch<AppDispatch>(); 
  const loading = useSelector((state: RootState) => selectLoading(state)); 
  const error = useSelector((state: RootState) => selectError(state)); 

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.auth.user);

  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Task Book for {listId}</h1>
      <TaskForm isEditMode={false} setIsEditMode={function (value: boolean): void {
        throw new Error("Function not implemented.");
      } } />
      
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error 404</p>}
      
      <TaskList />
    </div>
  );
};

export default ContactPage;