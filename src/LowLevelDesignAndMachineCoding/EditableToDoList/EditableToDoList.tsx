import { useState, useRef } from "react";

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
  edit: boolean;
}

const EditableToDoList = () => {
  const inputRef = useRef("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [editText, setEditText] = useState<string>("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: e.target.value,
          completed: false,
          edit: false,
        },
      ]);
      inputRef.current.value = "";
    }
  };

  const handleToDoStatusUpdate = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos?.map((todo) => {
        if (todo?.id === id) {
          return { ...todo, completed: !todo?.completed };
        }
        return todo;
      }),
    );
  };

  const handleToDoEdit = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos?.map((todo) => {
        if (todo?.id === id) {
          return { ...todo, edit: !todo?.edit };
        }
        return { ...todo, edit: false };
      }),
    );
  };

  const handleToDoDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos?.filter((todo) => todo?.id !== id));
  };

  const handleUpdateText = (id: number, value: string) => {
    if (value && id) {
      setTodos((prevTodos) =>
        prevTodos?.map((todo) => {
          if (todo?.id === id) {
            return { ...todo, text: value };
          }
          return todo;
        }),
      );
    }
  };

  return (
    <div className="px-2 pt-2">
      <div>
        <input
          placeholder="What are you going to do.."
          className="border-1 px-2 py-1 mb-4 rounded-md"
          type="text"
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
      </div>
      <div className="space-y-2">
        {todos?.map((todo) => (
          <div
            key={todo?.id}
            className="border-1 p-1 rounded-md flex justify-between"
          >
            <div onClick={() => handleToDoStatusUpdate(todo?.id)}>
              {todo?.completed ? "✅" : "⭕️"}
            </div>
            <div
              onDoubleClick={() => {
                if (!todo?.completed) {
                  handleToDoEdit(todo?.id);
                }
              }}
            >
              {todo?.edit ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                  }}
                  onBlur={() => {
                    handleToDoEdit(todo?.id);
                    handleUpdateText(todo?.id, editText);
                  }}
                />
              ) : (
                <div className={todo?.completed ? "line-through" : ""}>
                  {todo?.text}
                </div>
              )}
            </div>
            <div onClick={() => handleToDoDelete(todo?.id)}>🗑️</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditableToDoList;
