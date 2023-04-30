import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Label, TextInput, Button } from "flowbite-react";

export default function Form() {
  const [title, setTitle] = useState("");
  const newqueryclient = useQueryClient();
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const postTodo = async () => {
    const response = await fetch(`/api/todos/createTodo/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    }).then((res) => res.json());
    return response;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
    setTitle("");
  };

  const mutation = useMutation(postTodo, {
    onSuccess: () => newqueryclient.invalidateQueries("todos"),
  });
  return (
    <>
      <form className="flex flex-col gap-4 p-4" onSubmit={submit}>
        <div className="block">
          <Label htmlFor="title" value="New Todo" />
        </div>
        <TextInput id="title" type="text" name="title" required={true} onChange={changeTitle} value={title} />
        <Button type="submit" value="Submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    </>
  );
}
