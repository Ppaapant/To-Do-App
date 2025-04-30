import { useNavigate } from "react-router-dom";

interface ListProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const List = ({ id, title, onDelete, onEdit }: ListProps) => {
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