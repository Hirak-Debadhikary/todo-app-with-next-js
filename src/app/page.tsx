import AddTodo from "@/Components/AddTodo";
import TodoList from "@/Components/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center my-5 flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTodo />
      </div>
      <TodoList />
    </main>
  );
}
