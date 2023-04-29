import { useQuery } from "react-query";
import TodoItem from "./TodoItem";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect } from "react";

export default function TodoList() {
  const getTodos = async () => {
    const data = await fetch("api/todos/getTodos").then((res) => res.json());
    return data;
  };

  const { isLoading, isError, data, error } = useQuery("todos", getTodos);

  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  if (isLoading) {
    return <div>Loading....</div>;
  } else if (isError) {
    return <div>Error....</div>;
  }

  return (
    <ul ref={parent}>
      {data.map((e: any) => {
        return <TodoItem todo={e} key={e.id}></TodoItem>;
      })}
    </ul>
  );
}
