import TodoList from "@/components/list/TodoList";
import Form from "@/components/list/form";
import Streaks from "@/components/stats/Streaks";
import Heatmap from "@/components/stats/Heatmap";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className=" flex flex-col h-full p-8 pb-0">
          <TodoList></TodoList>
          <Form></Form>
        </div>
      ) : (
        <div>Unauthorized </div>
      )}
    </>
  );
}
