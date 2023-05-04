import { useQuery } from "react-query";
import { Spinner } from "flowbite-react";
import "react-calendar-heatmap/dist/styles.css";

import CalendarHeatmap from "react-calendar-heatmap";

const removeDuplicates = (arr: any) => {
  const set = new Set(arr);
  return [...set];
};

const countInArr = (val: string, arr: any) => {
  let count = 0;
  arr.forEach((e: string) => {
    if (e === val) {
      count++;
    }
  });
  return count;
};

export default function Heatmap() {
  const getDates = async () => {
    const data = await fetch("api/todos/getDates").then((res) => res.json());
    let dateList = data.map((e: any) => e.dateCompleted.slice(0, 10));
    let uniquelist = removeDuplicates(dateList);
    let heatmapData: any[] = [];
    uniquelist.forEach((e: any) => {
      heatmapData.push({ date: e, count: countInArr(e, dateList) });
    });
    console.log(heatmapData);
    return heatmapData;
  };

  const { isLoading, isError, data, error, isFetching } = useQuery("dates", getDates);
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
      {data && (
        <div className="flex flex-col p-2 border-[2px] shadow-sm rounded-lg my-4">
          <span className="p-2 font-semibold text-xl">Heatmap</span>
          <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={data}
          ></CalendarHeatmap>
        </div>
      )}

      {isFetching && (
        <div className="text-center">
          <Spinner size="xl"></Spinner>
        </div>
      )}
    </div>
  );
}
