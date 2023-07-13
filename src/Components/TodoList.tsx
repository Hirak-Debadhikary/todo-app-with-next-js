import { Task } from "@/types/tasks";
import Tasks from "./Task";

interface TodoListProps {
  tasks: Task[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr className="bg-slate-200 text-base ">
            <th className="w-3/4">Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Tasks key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
