import TodoList from "./list/TodoList";
import Form from "./list/form";
import Streaks from "./stats/Streaks";
import Heatmap from "./stats/Heatmap";

export default function Dashboard() {
  return (
    <div className="h-full p-8">
      <div className="flex flex-row h-full">
        <div className="flex-[30%] flex flex-col p-4">
          <TodoList></TodoList>
          <Form></Form>
        </div>
        <div className="flex-[70%]">
          <Streaks></Streaks>
          <Heatmap></Heatmap>
        </div>
      </div>
    </div>
  );
}
