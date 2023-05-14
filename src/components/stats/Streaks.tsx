import { useQuery } from "react-query";
import { Spinner } from "flowbite-react";
import { toast } from "react-hot-toast";

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
    toast.error("Error fetching streaks");
    return <div>Error....</div>;
  }
  return (
    <div className=" flex flex-col p-2 border-[2px] rounded-lg shadow-sm">
      <div className="flex flex-row">
        <span>Score</span>
        <span>{data.score}</span>
      </div>
      <span className="p-2 pb-0 font-semibold text-xl">Streaks</span>
      <div className="grid grid-cols-3 grid-rows-1 h-48 gap-2  ">
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold mb-2">Current Streak</span>
          <span className="text-4xl font-bold">{data.currentStreak}</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l-[2px] border-r-[2px]">
          <span className="text-2xl font-semibold mb-2">Max Streak</span>
          <span className="text-4xl font-bold">{data.maxStreak}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold mb-2">Previous Streak</span>
          <span className="text-4xl font-bold">{data.prevStreak}</span>
        </div>
      </div>

      {isFetching && (
        <div className="text-center">
          <Spinner size="xl"></Spinner>
        </div>
      )}
    </div>
  );
}
