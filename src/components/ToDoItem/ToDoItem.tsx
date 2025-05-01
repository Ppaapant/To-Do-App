import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { selectIsAdmin } from "../../redux/auth/selectors";

interface ListProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isAdmin:boolean;
}

const List = ({ id, title, onDelete, onEdit, isAdmin }: ListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleEditListClick = () => {
    navigate(`/tasks/${id}`);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mb-4">
      <p className="text-lg font-semibold text-gray-800">{title}</p>
      <div className="space-x-3">
        {isAdmin && (
          <>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete
            </button>
            <button
              onClick={() => onEdit(id)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Edit
            </button>
          </>
        )}

        <button
          onClick={handleEditListClick}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Edit list
        </button>
      </div>
    </li>
  );
};

export default List;