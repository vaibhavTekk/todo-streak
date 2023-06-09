import React, { useState } from "react";
import { Trash2 } from "react-feather";
import { useMutation, useQueryClient } from "react-query";
import { Button, Checkbox } from "flowbite-react";
import { toast } from "react-hot-toast";

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
      toast("Deleted todo !", {
        icon: "🗑️",
      });
      newqueryclient.invalidateQueries("todos");
      newqueryclient.invalidateQueries("streaks");
      newqueryclient.invalidateQueries("dates");
    },
    onError: () => {
      toast.error("Error Deleting Todo");
    },
  });

  const checkMutation = useMutation(markTodo, {
    onSuccess: (res) => {
      setChecked(res.completed);
      toast("Marked as Done ! + 10XP", {
        icon: "✅",
      });
      newqueryclient.invalidateQueries("todos");
      newqueryclient.invalidateQueries("streaks");
      newqueryclient.invalidateQueries("dates");
    },
    onError: () => {
      toast.error("Error marking Todo");
    },
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkMutation.mutate();
  };

  return (
    <li>
      <div className="flex flex-row py-1 px-4 items-center justify-between rounded-lg border-gray-600 border-[1px] border-opacity-10">
        <div className="flex flex-row gap-4 items-center">
          <Checkbox name="checkbox" id="checkbox" onChange={(e) => handleCheck(e)} defaultChecked={checked}></Checkbox>
          {checked ? <span className="line-through">{props.todo.title}</span> : <span>{props.todo.title}</span>}
        </div>
        <Button className="p-1 justify-self-end" size="xs" color="gray" onClick={() => deleteMutation.mutate()}>
          <Trash2 className="h-[16px] w-[16px]"></Trash2>
        </Button>
      </div>
    </li>
  );
}
