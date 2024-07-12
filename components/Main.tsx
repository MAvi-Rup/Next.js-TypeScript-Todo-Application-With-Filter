"use client";
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Main = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const handleAddTodo = () => {
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
    console.log(todos);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Todo App</h1>
        <div className="mb-4 flex ">
          <input
            type="text"
            className="flex-grow border border-gray-300 p-2 rounded-l text-black"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
        <div className="mb-4">
          <button
            className={`text-black mr-2 `}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`text-black mr-2 `}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`text-black 
            `}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="mr-2"
              />
              <span
                className={`text-black flex-grow ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                className="text-red-500"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
