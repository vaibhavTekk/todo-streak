import { useQuery } from "react-query";
import TodoItem from "./TodoItem";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect } from "react";
import { Spinner } from "flowbite-react";

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
    return (
      <div className="text-center">
        <Spinner size="xl"></Spinner>
      </div>
    );
  } else if (isError) {
    return <div>Error....</div>;
  }

  return (
    <div>
      <div>Pending</div>
      <ul ref={parent}>
        {data
          .filter((e: any) => !e.completed)
          .map((e: any) => {
            return <TodoItem todo={e} key={e.id}></TodoItem>;
          })}
      </ul>
      <div>Completed</div>
      <ul>
        {data
          .filter((e: any) => e.completed)
          .map((e: any) => {
            return <TodoItem todo={e} key={e.id}></TodoItem>;
          })}
      </ul>
    </div>
  );
}
