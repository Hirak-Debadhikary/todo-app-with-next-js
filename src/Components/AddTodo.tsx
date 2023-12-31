"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTodo = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTextValue, setNewTextValue] = useState<string>("");
  const [newStatusValue, setNewStatusValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addTodo({
      id: uuidv4(),
      title: newTextValue,
      status: newStatusValue,
    });
    setNewTextValue("");
    setNewStatusValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-outline btn-accent w-full"
      >
        Add New Task <AiOutlinePlus size={15} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {/* <h1>Modal For children</h1> */}
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={newTextValue}
              onChange={(e) => setNewTextValue(e.target.value)}
            />
            <select
              value={newStatusValue}
              className="select select-info max-w-xs w-2/5"
              onChange={(e) => setNewStatusValue(e.target.value)}
            >
              <option>
                Select Status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button type="submit" className="btn w-30">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTodo;
