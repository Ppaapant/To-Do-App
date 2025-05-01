import { FaPhone, FaUser } from "react-icons/fa";



interface TaskProps {
  id: string;
  name: string;
  description: string;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, name, description, onDelete }) => {
  return (
    <li>
      <div>
        <p><FaUser /> {name}</p>
        <p>{description}</p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default Task;