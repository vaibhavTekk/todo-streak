import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";

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
      <form className="form-control" onSubmit={submit}>
        <input className="input" type="text" name="title" onChange={changeTitle} value={title} />
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </>
  );
}
