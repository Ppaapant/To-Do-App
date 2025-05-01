
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";

interface TaskProps {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  isAdmin: boolean;  
}

const Task: React.FC<TaskProps> = ({ id, name, description, completed, onDelete, onToggleComplete, isAdmin }) => {
  return (
    <li className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-4">
        <button onClick={() => onToggleComplete(id, !completed)} className="text-xl">
          {completed ? (
            <BsCheckCircleFill className="text-green-500" />
          ) : (
            <BsCircle className="text-gray-400" />
          )}
        </button>
        <div>
          <p className={`font-semibold flex items-center gap-2 ${completed ? 'line-through text-gray-500' : ''}`}>
             {name}
          </p>
          <p className={`${completed ? 'line-through text-gray-400' : ''}`}>{description}</p>
        </div>
      </div>
      {isAdmin && (
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default Task;