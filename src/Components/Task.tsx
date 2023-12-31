"use client";
import { Task } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
interface TaskProps {
  task: Task;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.title);
  const [statusToEdit, setStatusToEdit] = useState<string>(task.status);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      title: taskToEdit,
      status: statusToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className="border-2 border-gray-200">
      <td className="text-lg w-2/3 ">{task.title}</td>
      <td>{task.status}</td>
      {/* <td>this is for description</td> */}
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          className="text-green-400 cursor-pointer"
          size={20}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          {/* <h1>Modal For children</h1> */}
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
              />
              <select
                value={statusToEdit}
                className="select select-info max-w-xs w-2/5"
                onChange={(e) => setStatusToEdit(e.target.value)}
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="submit" className="btn w-28 text-md">
                Edit
              </button>
            </div>
          </form>
        </Modal>

        {/*  */}
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          className="text-red-400 cursor-pointer"
          size={20}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h2 className="text-xl mt-2">You want to delete this task?</h2>
          <div className="modal-action">
            <button
              className="btn w-28 text-md"
              onClick={() => handleDeleteTask(task.id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
