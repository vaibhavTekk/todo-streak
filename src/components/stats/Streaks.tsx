import { useQuery } from "react-query";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Streaks() {
  const getStreaks = async () => {
    const data = await fetch("api/todos/getStreaks").then((res) => res.json());
    return data;
  };

  const { isLoading, isError, data, error, isFetching } = useQuery("streaks", getStreaks);

  const calculateStreaks = (arr: any) => {
    let count: number = 0;
    const dayDuration: number = 86400000;
    arr
      .map((el: any) => {
        return new Date(el.dateCompleted).setUTCHours(0, 0, 0, 0);
      })
      .sort()
      .reverse()
      .every((el: number, i: any) => {
        let date: number = el;
        let today: number = new Date().setUTCHours(0, 0, 0, 0);
        if (today - i * dayDuration === date) {
          console.log(date);
          count += 1;
        } else {
          return;
        }
      });
    return count;
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner size="xl"></Spinner>
      </div>
    );
  } else if (isError) {
    return <div>Error....</div>;
  }

  let streak = 0;
  if (data) {
    streak = calculateStreaks(data);
  }

  return (
    <div>
      <div>Current Streak: {streak}</div>

      {isFetching && (
        <div className="text-center">
          <Spinner size="xl"></Spinner>
        </div>
      )}
    </div>
  );
}
