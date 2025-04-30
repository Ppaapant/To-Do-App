import { FaPhone, FaUser } from "react-icons/fa";



const Task = ({ id, name, description, onDelete }) => {
  return (
    <li>
      <div>
      <p><FaUser /> {name}</p>
      <p> {description}</p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default Task;