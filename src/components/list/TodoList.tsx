import { useQuery } from "react-query";
import TodoItem from "./TodoItem";
import { Spinner } from "flowbite-react";

export default function TodoList() {
  const getTodos = async () => {
    const data = await fetch("api/todos/getTodos").then((res) => res.json());
    return data;
  };

  const { isLoading, isError, data, error, isFetching } = useQuery("todos", getTodos);

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
      <ul className="flex flex-col gap-2">
        {data
          .filter((e: any) => !e.completed)
          .map((e: any) => {
            return <TodoItem todo={e} key={e.id}></TodoItem>;
          })}
      </ul>
      <div>Completed</div>
      <ul className="flex flex-col gap-2">
        {data
          .filter((e: any) => e.completed)
          .map((e: any) => {
            return <TodoItem todo={e} key={e.id}></TodoItem>;
          })}
      </ul>

      {isFetching && (
        <div className="text-center m-8">
          <Spinner size="xl"></Spinner>
        </div>
      )}
    </div>
  );
}
