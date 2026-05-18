import { useState, useRef, useMemo } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import TodoItem from "./components/TodoItem";
import { todo } from "./types";
import { LuListTodo } from "react-icons/lu";

const TodoList = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const taskInputRef = useRef();
  const [filter, setFilter] = useState<
    "ALL" | "FINISHED" | "DELETED" | "PROGRESS"
  >("ALL");

  function handleAddNewTodo(e) {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        task: e.target.value,
        completed: false,
        deleted: false,
      },
    ]);
    taskInputRef.current.value = "";
  }

  function completeTodoItem(id: number) {
    const updatedTodoList = todos.map((todo) => {
      if (todo?.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodoList);
  }

  function deleteTodoItem(id: number) {
    const updatedTodoList = todos?.map((todo) => {
      if (todo?.id === id) {
        todo.deleted = true;
      }

      return todo;
    });
    setTodos(updatedTodoList);
  };

  function updateTodoItem(id: number, task: string) {
    const updatedTodoList = todos?.map((todo) => {
      if (todo?.id === id) {
        todo.task = task;
      }

      return todo;
    });
    setTodos(updatedTodoList);
  }

  const filteredTodos = useMemo(() => {
    if (filter === "DELETED") {
      return todos.filter((todo) => todo.deleted);
    }

    if (filter === "FINISHED") {
      return todos.filter((todo) => todo.completed && !todo.deleted);
    }

    if (filter === "PROGRESS") {
      return todos.filter((todo) => !todo.completed && !todo.deleted);
    }

    return todos;
  }, [todos, filter]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        { task: e.target.value, completed: false, id: Date.now() },
      ]);
      taskInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col mx-auto w-1/2 space-y-6">
      <h1 className="flex justify-center items-center gap-x-2 text-4xl font-medium">
        <LuListTodo /> ToDo
      </h1>
      <div className="flex gap-x-6">
        <CustomInput
          type="text"
          onKeyDown={handleKeyPress}
          ref={taskInputRef}
        />
        <CustomButton onClick={handleAddNewTodo}>Add</CustomButton>
      </div>
      <div className="space-x-4">
        Filters:{" "}
        <CustomButton
          variant={filter === "ALL" ? "primary" : "outline"}
          onClick={() => {
            setFilter("ALL");
          }}
        >
          All
        </CustomButton>{" "}
        <CustomButton
          variant={filter === "PROGRESS" ? "primary" : "outline"}
          onClick={() => {
            setFilter("PROGRESS");
          }}
        >
          In Progress
        </CustomButton>{" "}
        <CustomButton
          variant={filter === "FINISHED" ? "primary" : "outline"}
          onClick={() => {
            setFilter("FINISHED");
          }}
        >
          Finished
        </CustomButton>{" "}
        <CustomButton
          variant={filter === "DELETED" ? "primary" : "outline"}
          onClick={() => {
            setFilter("DELETED");
          }}
        >
          Deleted
        </CustomButton>
      </div>
      <div>
        {filteredTodos.length > 0 ? (
          filteredTodos?.map((todo: todo) => (
            <TodoItem
              key={todo?.id}
              todo={todo}
              deleteTodoItem={deleteTodoItem}
              completeTodoItem={completeTodoItem}
              updateTodoItem={updateTodoItem}
            />
          ))
        ) : (
          <div className="text-center font-3xl font-semibold">
            Nothing To Do
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
