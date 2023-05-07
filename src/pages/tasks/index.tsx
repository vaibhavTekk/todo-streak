import TodoList from "@/components/list/TodoList";
import Form from "@/components/list/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Tasks() {
  const { data: session } = useSession();
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
