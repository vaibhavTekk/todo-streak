import React, { useState } from "react";
import { Trash2 } from "react-feather";
import { QueryClient, useMutation, useQueries, useQueryClient } from "react-query";
import { setConstantValue } from "typescript";

export default function TodoItem(props: any) {
  const id = props.todo.id;
  const newqueryclient = useQueryClient();

  const [checked, setChecked] = useState(props.todo.completed);

  const deleteTodo = async () => {
    const response = await fetch("api/todos/deleteTodo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }).then((res) => res.json());
    return response;
  };

  const markTodo = async () => {
    const response = await fetch("api/todos/markTodo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        checked,
      }),
    }).then((res) => res.json());

    return response;
  };

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      newqueryclient.invalidateQueries("todos");
    },
  });

  const checkMutation = useMutation(markTodo, {
    onSuccess: (res) => {
      setChecked(res.completed);
      newqueryclient.invalidateQueries("todos");
    },
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkMutation.mutate();
  };

  return (
    <li>
      <div className="flex flex-row p-8 items-center h-12 gap-2">
        <input
          type="checkbox"
          className="checkbox"
          name="checkbox"
          id=""
          onChange={(e) => handleCheck(e)}
          defaultChecked={checked}
        />
        {checked ? <span className="line-through">{props.todo.title}</span> : <span>{props.todo.title}</span>}
        <button className="btn btn-square btn-ghost btn-sm" onClick={() => deleteMutation.mutate()}>
          <Trash2 className="h-1/2" />
        </button>
      </div>
    </li>
  );
}
