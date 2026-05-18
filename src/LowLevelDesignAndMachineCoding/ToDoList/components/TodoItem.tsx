import { useState } from "react";
import { todoItem } from "../types";
import { RxCross2 } from "react-icons/rx";
import CustomInput from "../../../components/CustomInput/CustomInput";

const TodoItem = ({
  todo,
  deleteTodoItem,
  completeTodoItem,
  updateTodoItem,
}: todoItem) => {
  const { task, completed, id, deleted } = todo;
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState(task);

  return (
    <div
      className={`${deleted ? "bg-red-500" : ""} flex items-center gap-x-6 border-b-1`}
    >
      {!deleted ? (
        <input
          type="checkbox"
          checked={completed}
          onChange={() => completeTodoItem(id)}
        />
      ) : (
        <></>
      )}
      {edit ? (
        <div className="my-2">
          <CustomInput
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            onBlur={() => {
              setEdit(false);
              updateTodoItem(id, editText);
            }}
          />
        </div>
      ) : (
        <div
          className={completed ? "line-through" : "cursor-pointer"}
          onDoubleClick={() => {
            if (!completed) {
              setEdit(true);
            }
          }}
        >
          {task}
        </div>
      )}
      {!deleted ? (
        <div className="cursor-pointer" onClick={() => deleteTodoItem(id)}>
          <RxCross2 />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodoItem;
