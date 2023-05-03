import { useQuery } from "react-query";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Streaks() {
  const getStreaks = async () => {
    const data = await fetch("api/todos/getStreaks").then((res) => res.json());
    return data;
  };

  const { isLoading, isError, data, error, isFetching } = useQuery("streaks", getStreaks);
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
      <div>Current Streak: {data.currentStreak}</div>
      <div>Max Streak: {data.maxStreak}</div>
      <div>Previous Streak: {data.prevStreak}</div>

      {isFetching && (
        <div className="text-center">
          <Spinner size="xl"></Spinner>
        </div>
      )}
    </div>
  );
}
