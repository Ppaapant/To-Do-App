import { useNavigate } from "react-router-dom";

const List = ({ id, title, onDelete, onEdit }) => {
    const navigate = useNavigate();  

    const handleEditClick = () => {
      navigate(`/tasks/${id}`);  
    };
    return (
      <li>
        <p>{title}</p>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => onEdit(id)}>Edit</button>
        <button onClick={handleEditClick}>Edit list</button>
      </li>
    );
  };
  
  export default List;