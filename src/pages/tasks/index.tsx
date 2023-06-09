import TodoList from "@/components/list/TodoList";
import Form from "@/components/list/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Tasks() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      toast.error("Unauthenticated");
      router.push("/");
    },
  });
  return (
    <>
      {session ? (
        <div className=" flex flex-col h-full p-8 pb-0">
          <TodoList></TodoList>
          <Form></Form>
        </div>
      ) : (
        <div>Unauthorized... Please Log in</div>
      )}
    </>
  );
}
