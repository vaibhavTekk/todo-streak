import { useState } from "react";

function submit(): void {
  fetch("/api/todos/create", { method: "GET", body: "Hello" }).then();
}

export default function CreateTodo() {
  return (
    <>
      <form>
        <input type="text" />
        <button onClick={submit()}></button>
      </form>
    </>
  );
}
