import AddTodo from "@/Components/AddTodo";
import TodoList from "@/Components/TodoList";
import { getAllTodos } from "@/api";

const Page = async () => {
  const tasks = await getAllTodos();
  // console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-4 p-4">
      <div className="text-center my-5 flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTodo />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
};

export default Page;
