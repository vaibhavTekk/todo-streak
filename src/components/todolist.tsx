import { spawn } from "child_process";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("api/todos/getTodos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);
  
  if (isLoading) {
    return <div>Loading....</div>;
  } else {
    return (
      <div>
        {data?.map((e: any) => {
          return <div>{e.title}</div>;
        })}
      </div>
    );
  }
}
