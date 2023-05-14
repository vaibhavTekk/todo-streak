import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { Label, TextInput, Button, Select } from "flowbite-react";
import { toast } from "react-hot-toast";

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
    onSuccess: () => {
      newqueryclient.invalidateQueries("todos");
    },
    onError: () => {
      toast.error("Error Creating Todos");
    },
  });
  return (
    <>
      <form className="flex flex-col gap-4 p-4" onSubmit={submit}>
        <div className="block">
          <Label htmlFor="title" value="New Todo" />
        </div>
        <TextInput id="title" type="text" name="title" required={true} onChange={changeTitle} value={title} />
        <div id="select">
          <div className="mb-2 block">
            <Label htmlFor="groups" value="Select group" />
          </div>
          <Select id="groups" required={true}>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <Button type="submit" value="Submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    </>
  );
}
