import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function Form() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/todos/create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    console.log(response);
  };
  return (
    <>
      <form className="form-control">
        <input className="input" type="text" name="title" onChange={changeTitle} />
        <button className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </form>
    </>
  );
}
