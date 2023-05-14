import TodoList from "@/components/list/TodoList";
import Form from "@/components/list/form";
import Streaks from "@/components/stats/Streaks";
import Heatmap from "@/components/stats/Heatmap";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      toast.error("Unauthenticated");
      router.push("/");
    },
  });

  return (
    <>
      {session ? (
        <div className="h-full p-8 pb-0">
          <div className="flex flex-row h-full gap-2">
            <div className="flex-[30%] flex flex-col">
              <TodoList></TodoList>
              <Form></Form>
            </div>
            <div className="flex-[70%]">
              <Streaks></Streaks>
              <Heatmap></Heatmap>
            </div>
          </div>
        </div>
      ) : (
        <div>Unauthorized.. Please Log in</div>
      )}
    </>
  );
}
