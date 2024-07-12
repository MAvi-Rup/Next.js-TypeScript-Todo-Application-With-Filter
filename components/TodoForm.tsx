"use client";
import { todo } from "node:test";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type todo = {
  id: string;
  task: string;
  isCompleted: boolean;
};

export const TodoForm: React.FC = () => {
  const [todos, setTodos] = useState<todo[]>([]); //Todo List Array
  const [todoText, setTodoText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const toggleTask = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      })
    );
  };

  const handleDeleteTask = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id != id;
      })
    );
  };

  const handleTaskSubmit = () => {
    const todo: todo = {
      id: uuidv4(),
      task: todoText,
      isCompleted: false,
    };
    setTodos([...todos, todo]);
    setTodoText("");

    console.log(todos);
  };

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center">
        <div className=" bg-slate-400 p-8 rounded">
          <h1>Todo Application</h1>
          <div className=" flex ">
            <input
              placeholder="Write your task"
              value={todoText}
              onChange={(e) => {
                setTodoText(e.target.value);
              }}
              className=" bg-slate-800 text-white p-4 rounded-sm mb-5"
              type="text"
            />
            <button
              onClick={handleTaskSubmit}
              className=" ml-4 bg-fuchsia-600 text-yellow-50  p-4 rounded-r mb-5"
              type="submit"
            >
              Add Task
            </button>
          </div>
          <div className=" bg-orange-400 mb-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex gap-3 items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTask(todo.id)}
                    className=" mr-4 p-2"
                  />
                  <p
                    className={` text-black ${
                      todo.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {todo.task}
                  </p>
                </div>
                <button
                  className=" p-4 bg-red-500 text-white "
                  onClick={() => {
                    handleDeleteTask(todo.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
